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
  ) { }

  // STORING, GETTING CURRENT LOGGED-IN USER (NAV, USER-DETAILS)
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
        if (!user) {  // HA NEM SIKERÜL A BEJELENKEZÉS
          localStorage.removeItem('currentUser'); //TÖRÖLJÜK A LOCAL STORAGE-BŐL A CURRENT USER-T
          this.currentUserSubject.next(null);     // KISUGÁROZZUK, HOGY NINCS USER
        } else {  //HA SIKERÜLT
          this.lastToken = user.token;  //ELMENTJÜK A TOKENT (A JWT-NEK)
          localStorage.setItem('currentUser', JSON.stringify(user)); //BEÁLLÍTJUK A LOCAL STORAGE-BE A USERT
          this.currentUserSubject.next(user); //KISUGÁROZZUK AZ ÚJ USERT
          // console.log(user);
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


}
