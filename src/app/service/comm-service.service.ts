import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { UserEmailPasswordInterface, UserInterface } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CommServiceService {

  private readonly ARTICLE_URL: string = 'http://localhost:3000/api/articles';
  private readonly USER_URL: string = 'http://localhost:3000/api/users';
  private readonly LOGIN_URL: string = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  public saveArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.ARTICLE_URL, article);
  }



  public saveUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.USER_URL, user);
  }
  
  public loginUser(user: UserEmailPasswordInterface): Observable<any> {
    return this.http.post<UserInterface>(this.LOGIN_URL, user);
  }
  
}
