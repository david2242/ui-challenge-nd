import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { CommServiceService } from 'src/app/service/comm-service.service';



@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  codec = new HttpUrlEncodingCodec;
  private paramObs?: Subscription;
  articleEncodedSlug: string | null = "";
  public updating: boolean = false;

  constructor(
    private http: CommServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) { }

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
    this.articleEncodedSlug = this.activatedRoute.snapshot.paramMap.get('index');
    if (this.articleEncodedSlug) {
      this.updating = true;
      this.articleService.get(this.codec.decodeValue(this.articleEncodedSlug)).subscribe(
        (res: any) => {
          this.newArticle = res.article;
          // console.log(this.newArticle);
          this.articleForm.setValue({
            articleTitle: this.newArticle.title,
            articleDescription: this.newArticle.description,
            articleBody: this.newArticle.body,
            articleTags: this.tagFiller(this.newArticle.tagList)
          });

        }
      )
    }
    // console.log(this.updating);
  }

  
  private saveArticleValuesFromInput(): void {
    this.newArticle.title = this.articleForm.value.articleTitle;
    this.newArticle.description = this.articleForm.value.articleDescription;
    this.newArticle.body = this.articleForm.value.articleBody;
    this.newArticle.tagList = this.tagReader(this.articleForm.value.articleTags);
  }
  
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
  
  public submitArticle(): void {
    this.saveArticleValuesFromInput();
    this.http.saveArticle(this.newArticle).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['article-list']);
      }
    );
  }

  updateArticle() {
    this.saveArticleValuesFromInput();
    if (this.newArticle.slug) {
      this.articleService.update(this.newArticle.slug, this.newArticle).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['article-list']);
        }
      );
    }
  }

  deleteArticle() {
    if (this.newArticle.slug) {
      this.articleService.delete(this.newArticle.slug).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['article-list']);
        }
      );
    }
  }

}
