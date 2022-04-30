import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser, UserInfo, UserInterface } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  get(): Observable<UserInterface> {
    let url = 'http://localhost:3000/api/user';
    return this.http.get<UserInterface>(url);

  }
  getAll(): Observable<UserInterface[]> {
    let url = 'http://localhost:3000/api/users';
    return this.http.get<UserInterface[]>(url);
  }

  update(user: UserInfo): Observable<UserInterface> {
    let url = 'http://localhost:3000/api/user';
    return this.http.put<UserInterface>(url, user);
  }

  create(user: CreateUser): Observable<UserInterface> {
    let url = 'http://localhost:3000/api/users';
    return this.http.post<UserInterface>(url, user);
  }

  delete(email: string): Observable<any>{
    let url = `http://localhost:3000/api/users/${email}`;
    return this.http.delete(url);
  }

}
