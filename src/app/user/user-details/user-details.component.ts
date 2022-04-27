import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo, UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  // TEMPLATE-DRIVEN FORM
  public userForm: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userBio: new FormControl(''),
    userImage: new FormControl('')
  });

  // LOCAL OBJECT
  private currentUser: UserInfo = {
    username: "",
    email: "",
    bio: "",
    image: ""
  };

  ngOnInit(): void {
    if (localStorage['currentUser']) {
      this.currentUser = JSON.parse(localStorage['currentUser']);
    };

    // FILLING FORM WITH USER VALUES
    this.userForm.setValue({
      userEmail: this.currentUser.email,
      userName: this.currentUser.username,
      userBio: this.currentUser.bio,
      userImage: this.currentUser.image,
    });
  }

  // SAVING VALUES FROM IMPUT TO LOCAL OBJECT
  private saveUserDataFromInput(): void {
    this.currentUser.username = this.userForm.value.userName;
    this.currentUser.email = this.userForm.value.userEmail;
    if (this.userForm.value.userBio) this.currentUser.bio = this.userForm.value.userBio;
    if (this.userForm.value.userImage) this.currentUser.image = this.userForm.value.userImage;
  }

  // UPDATING USER
  public updateUser() {
    this.saveUserDataFromInput();
    this.userService.update(this.currentUser).subscribe(
      (user) => {
        console.log(user);
        localStorage.clear();
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.auth.currentUserSubject.next(user);
        this.toastr.success('User details updated!', 'Success!');
      },
      err => {
        this.showError(this.createErrorMessage(err.error.errors));
      }
    )
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

