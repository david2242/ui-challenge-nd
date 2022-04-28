import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateUser, UserEmailPasswordInterface, UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faLess } from '@fortawesome/free-brands-svg-icons';

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
    userPasswordAgain: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
  },
  {
    // validators: this.confirmPasswordMatch('userPassword', 'userPasswordAgain')
  }
  )

  get userEmail() {
    return this.userForm.get('userEmail');
  }
  get userPassword() {
    return this.userForm.get('userPassword');
  }
  get userPasswordAgain() {
    return this.userForm.get('userPasswordAgain');
  }
  get userName() {
    return this.userForm.get('userName');
  }


  // LOGIN
  public loginForm: FormGroup = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }
  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

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
      res => {
        this.userForm.reset();
        this.toastr.success('User registrated!', 'Congrats!');
      },
      err => {
        if (err.error.errors) this.showError(this.createErrorMessage(err.error.errors));  // Van amikor az error message 'errors' kulcsba volt csomagolva,
        if (err.error._errors) this.showError(this.createErrorMessage(err.error._errors)); // de van amikor '_errors' kulcsba volt csomagolva.
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

  // VALIDATION HELPING FUNCTIONS 
  validHelper(formControl: AbstractControl | null): string {
    if (formControl!.pristine) return 'form-control';
    if (formControl!.invalid && formControl!.dirty) return 'form-control is-invalid';
    if (formControl!.valid && formControl!.dirty) return 'form-control is-valid';
    return 'form-control';
  }
  smallTextHelper(formControl: AbstractControl | null): boolean {
    return (formControl!.invalid && formControl!.dirty);
  }

  //PASSWORD CONFIRM 
  passwordHelper(): string {
    if (this.userPasswordAgain!.pristine) return 'form-control';
    if (((this.userPassword!.value == this.userPasswordAgain!.value) && this.userPasswordAgain!.value)) return 'form-control is-valid';
    if (((this.userPassword!.value != this.userPasswordAgain!.value) && this.userPasswordAgain!.dirty)) return 'form-control is-invalid';
    return 'form-control';
  }
  passwordSmallTextHelper(): boolean | undefined{
    return ((this.userForm.get('userPassword')?.value != this.userForm.get('userPasswordAgain')?.value) && this.userForm.get('userPasswordAgain')?.dirty);
  }

  
}


// interface ValidatorFn {
//   (control: AbstractControl): ValidationErrors | null
//   confirmPasswordMatch(controlName: string, matchingControlName: string): any {
//     return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (control.value != matchingControl.value) {
//         matchingControl.setErrors({comfirmPasswordMatch: true});
//       } else {
//         matchingControl.setErrors(null);
//       }
//     }
//   }
// }


