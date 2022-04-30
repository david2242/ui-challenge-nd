import { HttpBackend, HttpClient } from '@angular/common/http';
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

  imageFile: any;
  // imageURL: string = "";
  CLOUDINARY_URL: string = "https://api.cloudinary.com/v1_1/ddkxkkxdt/upload";
  CLOUDINARY_UPLOAD_PRESET: string = "vpallkqj";

  responseObj: any = {
    secure_url: ""
  };

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService,
    private handler: HttpBackend,
    private httpClient: HttpClient
  ) {
    this.httpClient = new HttpClient(handler);
  }

  // TEMPLATE-DRIVEN FORM
  public userForm: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userBio: new FormControl(''),
    userImage: new FormControl('')
  });

  // LOCAL OBJECT
  public currentUser: UserInfo = {
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

  // SELECTING AN IMAGE FILE
  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
    console.log(event);
  }

  // UPDATING USER
  public updateUser() {
    this.saveUserDataFromInput();
    if (this.imageFile) {
      const fd = new FormData();
      fd.append('file', this.imageFile);
      fd.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
      this.httpClient.post(this.CLOUDINARY_URL, fd).subscribe(
        res => {
          this.responseObj = res;
          this.currentUser.image = this.responseObj.secure_url;
          this.updateUserTexts();
        }
      )
    } else {
      this.updateUserTexts()
    }
  }

  //UPDATING USER INFO, USED AFTER IMAGE UPLOAD INMEDIATELY
  private updateUserTexts(): void {
    this.userService.update(this.currentUser).subscribe(
      (user) => {
        localStorage.clear();
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.auth.currentUserSubject.next(user);
        this.toastr.success('User details updated!', 'Success!');
      },
      err => {
        this.showError(this.createErrorMessage(err.error.errors));
      })
  }

  //CREATING UNIQUE ERROR MESSAGE
  showError(message: string) {
    this.toastr.error(message, "Error!", {
      enableHtml: true,
      progressBar: true
    })
  }

  //JOINING MULTIPLE ERROR MESSAGES
  createErrorMessage(errors: any): string {
    return Object.values(errors).join('</br>');
  }
}

