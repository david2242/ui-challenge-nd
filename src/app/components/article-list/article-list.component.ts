import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public articleList: Article[] = [];
  codec = new HttpUrlEncodingCodec;



  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe(
      (res: any) => {
        console.log(res);
        this.articleList = res.articles;
      }
    )
  }

  public showChosenArticle(slug: string) {
    const encodedSlug = this.codec.encodeValue(slug);
    this.articleService.chosenSlug = slug;
    this.router.navigate(['article-show']);
  }

}
