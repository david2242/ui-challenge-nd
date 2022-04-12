import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {


  public showArticle: Article = {
    title: "",
    description: "",
    body: "",
    tagList: []
  }
  
  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleService.get(this.articleService.chosenSlug).subscribe(
      (res: any) => {
        this.showArticle = res.article;
        console.log(this.showArticle);
      }
    );
  }

  editArticle(slug: string) {
    this.router.navigate(['article', slug])
  }

}
