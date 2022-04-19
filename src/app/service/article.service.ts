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


  // ARTICLE SECTION

  public createArticle(article: Article): Observable<Article> {
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
    return this.http.delete(`${this.ARTICLE_URL}/${slug}`);
  }

  public favorite(slug?: string) {
    return this.http.post(`${this.ARTICLE_URL}/${slug}/favorite`, "");
  }
  public deFavorite(slug?: string) {
    return this.http.delete(`${this.ARTICLE_URL}/${slug}/favorite`);
  }


  // COMMENTS SECTION
  
  public createComment(commentBody: string, slug: string): Observable<any> {
    return this.http.post(`${this.ARTICLE_URL}/${slug}/comments`, commentBody);
  }

  public deleteComment(commentId: number, slug: string): Observable<any> {
    return this.http.delete(`${this.ARTICLE_URL}/${slug}/comments/${commentId}`);
  }


  // GET TAGS

  public getTags() {
    return this.http.get(`http://localhost:3000/api/tags`);
  }
}
