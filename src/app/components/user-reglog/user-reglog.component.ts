import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateUser, UserEmailPasswordInterface, UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-reglog',
  templateUrl: './user-reglog.component.html',
  styleUrls: ['./user-reglog.component.scss']
})
export class UserReglogComponent implements OnInit {

  public userForm: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // userBio: new FormControl(''),
    // userImage: new FormControl('')
  });

  public loginForm: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  private newUser: CreateUser = {
    username: "",
    email: "",
    password: ""
  };

  errorMessages: string[] = [];
  displayStyle: string = "none";

  constructor(
    private auth: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  private saveUserDataFromInput(): void {
    this.newUser.username = this.userForm.value.userName;
    this.newUser.email = this.userForm.value.userEmail;
    this.newUser.password = this.userForm.value.userPassword;
    console.log(this.newUser);
  }

  public loginUser(): void {
    const loginData: UserEmailPasswordInterface = {
      email: this.loginForm.value.loginEmail,
      password: this.loginForm.value.loginPassword
    };
    this.auth.login(loginData).toPromise().then(
      userResponse => {
        console.log("You are logged in as " + this.auth.currentUserValue.username);
        console.log(userResponse);
        this.loginForm.reset();
      },
      err => {
        this.errorMessages = [];
        this.displayStyle = "block";
        Object.values(err.error.errors).forEach(val => this.errorMessages.push(String(val)));
      }
    );
  }

  public regNewUser(): void {
    this.saveUserDataFromInput();
    this.userService.create(this.newUser).subscribe(
      res => this.userForm.reset(),
      err => {
        this.errorMessages = [];
        this.displayStyle = "block";
        Object.values(err.error.errors).forEach(val => this.errorMessages.push(String(val)));
      }
    );
  }

  closePopup(): void {
    this.displayStyle = "none";
  }

}
