import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  currentUser?: UserInterface;
  private userSub?: Subscription;

  constructor(
    private auth: AuthService
  ) { }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      (res) => {
        if (res) {
          this.currentUser = res;
        } else this.currentUser = undefined;
      }
    )

    // EZZEL A VERZIÓVAL A LOCALSTORAGE ÉRTÉKE ALAPJÁN TÖRTÉNNE A DÖNTÉS, HOGY BE VAGYUNK E JELENTKEZVE VAGY NEM

    // if (localStorage['currentUser']) {
    //   this.currentUser = JSON.parse(localStorage['currentUser']);
    // } else this.currentUser = undefined;

  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
