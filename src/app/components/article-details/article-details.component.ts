import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/model/article';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  codec = new HttpUrlEncodingCodec;
  param = 'ez-a-masodik-cikk - d3vvqb';
  private paramObs?: Subscription;
  articleEncodedSlug: string|null = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) { }


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
      this.articleService.get(this.codec.decodeValue(this.articleEncodedSlug)).subscribe(
        article => console.log(article)
      )
    }
  }

  submitArticle() {
    
  }
  // this.newArticle.setValue({
  //   articleTitle: this.articleForm.articleTitle,
  // });

  // private saveArticleValuesFromInput(): void {
  //   this.newArticle.title = this.articleForm.value.articleTitle;
  //   this.newArticle.description = this.articleForm.value.articleDescription;
  //   this.newArticle.body = this.articleForm.value.articleBody;
  //   this.newArticle.tagList = this.tagReader(this.articleForm.value.articleTags);
  // }

  // private tagReader(arrayOfChips:Array<{'display': string, 'value': string}>): Array<string> {
  //   let arrayOfTags: Array<string> = [];
  //   for (let i = 0; i < arrayOfChips.length; i++) {
  //     arrayOfTags.push(arrayOfChips[i].value);
  //   }
  //   return arrayOfTags;
  // }

  ngOnDestroy(): void {
    // this.paramObs?.unsubscribe();
  }

}
