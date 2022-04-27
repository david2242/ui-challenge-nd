import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
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
  
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
  }


  public followUser(username: string): void {
    this.profile.followUser(username).subscribe(
      res => {
        console.log(res);
        this.pickedUserProfile = res.profile;
      },
      err => console.log(err)
    )
  }

  public unfollowUser(username: string): void {
    this.profile.unfollowUser(username).subscribe(
      res => {
        console.log(res);
        this.pickedUserProfile = res.profile;
      },
      err => console.log(err)
    )
  }

}
