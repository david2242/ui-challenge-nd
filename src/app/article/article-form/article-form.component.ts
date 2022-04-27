import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/article';
import { UserInterface } from 'src/app/model/user';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  codec = new HttpUrlEncodingCodec;
  articleEncodedSlug: string | null = "";
  public updating: boolean = false;
  public loggedIn: UserInterface = this.auth.currentUserValue;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private toastr: ToastrService,
    private auth: AuthService
    ) { }

  // TEMPLATE-DRIVEN FORM
  public articleForm: FormGroup = new FormGroup({
    articleTitle: new FormControl('', Validators.required),
    articleDescription: new FormControl(''),
    articleBody: new FormControl('', Validators.required),
    articleTags: new FormControl('')
  });

  public newArticle: Article = {
    title: "",
    description: "",
    body: "",
    tagList: []
  }

  ngOnInit(): void {
    //FILLING THE INPUTS WITH THE SPECIFIC ARTICLE VALUES
    this.articleEncodedSlug = this.activatedRoute.snapshot.paramMap.get('index');
    if (this.articleEncodedSlug) {
      this.updating = true; //THERE ARE VALUES, -> ARTICLE UPDATE
      this.articleService.get(this.codec.decodeValue(this.articleEncodedSlug)).subscribe(
        (res: any) => {
          this.newArticle = res.article;
          this.articleForm.setValue({
            articleTitle: this.newArticle.title,
            articleDescription: this.newArticle.description,
            articleBody: this.newArticle.body,
            articleTags: this.tagFiller(this.newArticle.tagList)
          });
        }
      )
    }
  }

  // SAVING INPUT-VALUES TO OBJECT
  private saveArticleValuesFromInput(): void {
    this.newArticle.title = this.articleForm.value.articleTitle;
    this.newArticle.description = this.articleForm.value.articleDescription;
    this.newArticle.body = this.articleForm.value.articleBody;
    this.newArticle.tagList = this.tagReader(this.articleForm.value.articleTags);
  }
  
  //FORMATTING TAGS TO NG-CHIPS FORMAT AND BACK
  private tagReader(arrayOfChips: Array<{ 'display': string, 'value': string }>): Array<string> {
    let arrayOfTags: Array<string> = [];
    for (let i = 0; i < arrayOfChips.length; i++) {
      arrayOfTags.push(arrayOfChips[i].value);
    }
    return arrayOfTags;
  }
  
  private tagFiller(tagList: string[]) {
    let ngChipsFormat = [];
    for (let i = 0; i < tagList.length; i++) {
      ngChipsFormat.push({ display: tagList[i], value: tagList[i] });
    };
    return ngChipsFormat;
  }
  

  // ARTICLE ACTIONS
  public submitArticle(): void {
    this.saveArticleValuesFromInput();
    this.articleService.createArticle(this.newArticle).subscribe(
      (res) => {
        this.router.navigate(['article','list']);
      },
      err => {
        this.showError(err.error.message);
      }
    );
  }

  public updateArticle(): void {
    this.saveArticleValuesFromInput();
    if (this.newArticle.slug) {
      this.articleService.update(this.newArticle.slug, this.newArticle).subscribe(
        res => {
          this.toastr.success('Article updated!', 'OK!')
          this.router.navigate(['article', 'show']);
        }
      );
    }
  }

  public deleteArticle(): void {
    if (this.newArticle.slug) {
      this.articleService.delete(this.newArticle.slug).subscribe(
        res => {
          this.toastr.success('Article deleted!', 'Deleted!')
          this.router.navigate(['article', 'list']);
        }
      );
    }
  }


  // TOASTR ERROR MESSAGE
  showError(message: string) {
    this.toastr.error(message, "Error!", {
      enableHtml: true,
      progressBar: true
    })
  }

}
