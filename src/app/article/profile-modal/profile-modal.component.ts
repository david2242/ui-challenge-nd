import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  @Input() loggedIn: boolean = false;
  @Input() pickedUserProfile: UserProfile = {
    username: "",
    bio: "",
    image: ""
  };
  public loggedInUsername: string = ""
  
  constructor(
    private profile: ProfileService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.loggedInUsername = this.auth.currentUserValue.username;
  }

  //FOLLOWING USER
  public followUser(username: string): void {
    this.profile.followUser(username).subscribe(
      res => {
        this.pickedUserProfile = res.profile;
      },
      err => console.log(err)
    )
  }

  //UNFOLLOW USER
  public unfollowUser(username: string): void {
    this.profile.unfollowUser(username).subscribe(
      res => {
        this.pickedUserProfile = res.profile;
      },
      err => console.log(err)
    )
  }

}
