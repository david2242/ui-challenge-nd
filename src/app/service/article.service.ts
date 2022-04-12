import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly ARTICLE_URL: string = 'http://localhost:3000/api/articles';

  public chosenSlug: string = "";

  constructor(
    private http: HttpClient) { }

  public create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.ARTICLE_URL, article);
  }

  public getAll(): any {
    return this.http.get(this.ARTICLE_URL);
  }

  public get(slug: string) {
    return this.http.get(`${this.ARTICLE_URL}/${slug}`);
  }

  public update(slug: string, article: Article) {
    return this.http.put(`${this.ARTICLE_URL}/${slug}`, article);
  }

  public delete(slug: string) {
    console.log(`${this.ARTICLE_URL}/${slug}`);
    return this.http.delete(`${this.ARTICLE_URL}/${slug}`);
  }


}
