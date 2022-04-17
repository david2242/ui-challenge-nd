import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { UserEmailPasswordInterface, UserInterface } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://localhost:3000/api/login';
  currentUserSubject: BehaviorSubject<any> =  new BehaviorSubject(null);
  lastToken: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    // private userService: UserService
  ) { }

  get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  login(loginData: UserEmailPasswordInterface): Observable<UserInterface> {
    return this.http.post<{user: UserInterface}>(
      this.loginUrl,
      {email: loginData.email, password: loginData.password}
    )
    .pipe(
      map(response => response.user)
    )
    .pipe(
      tap(user => {
        if (!user) {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        } else {
          this.lastToken = user.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
        }
      })
    )

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // console.log(this.currentUserValue);
    this.router.navigate(['user-reglog']);
  }

  getUser() {
    
  }

}
