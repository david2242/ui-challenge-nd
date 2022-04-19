import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUser, UserEmailPasswordInterface, UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reglog',
  templateUrl: './user-reglog.component.html',
  styleUrls: ['./user-reglog.component.scss']
})
export class UserReglogComponent implements OnInit {

  // TEMPLATE-DRIVEN FORMS
  // REGISTRATION
  public userForm: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  // LOGIN
  public loginForm: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  // LOCAL NEW-USER OBJECT
  private newUser: CreateUser = {
    username: "",
    email: "",
    password: ""
  };



  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // SAVING VALUES FROM INPUTS
  private saveUserDataFromInput(): void {
    this.newUser.username = this.userForm.value.userName;
    this.newUser.email = this.userForm.value.userEmail;
    this.newUser.password = this.userForm.value.userPassword;
    console.log(this.newUser);
  }

  // LOGIN USER ACTION
  public loginUser(): void {
    const loginData: UserEmailPasswordInterface = {
      email: this.loginForm.value.loginEmail,
      password: this.loginForm.value.loginPassword
    };
    this.auth.login(loginData).toPromise().then(
      userResponse => {
        this.showSuccessLogin(this.auth.currentUserValue.username),
        this.router.navigate(['']);
      },
      err => {
        this.showError(this.createErrorMessage(err.error.errors));
      }
    );
  }

  // REGISTRATE USER ACTION
  public regNewUser(): void {
    this.saveUserDataFromInput();
    this.userService.create(this.newUser).subscribe(
      res => this.userForm.reset(),
      err => {
        this.showError(this.createErrorMessage(err.error.errors));
      }
    );
  }

  //TOASTER MESSAGES
  showSuccessLogin(username: string) {
    this.toastr.success(`Welcome ${username}!`, 'Login success!');
  }
  showError(message: string) {
    this.toastr.error(message, "Error!", {
      enableHtml: true,
      progressBar: true
    })
  }
  createErrorMessage(errors: any): string {
    return Object.values(errors).join('</br>');
  }

}
