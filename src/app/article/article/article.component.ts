import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ProfileService } from 'src/app/service/profile.service';
import { UserInfo, UserProfile } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  // ARTICLE TO SHOW
  public showArticle: Article = {
    title: "",
    description: "",
    body: "",
    tagList: []
  }
  

  public loggedIn: boolean = false;
  faPenSquare = faPenSquare; faTrash = faTrash;
  solidFaStar = solidFaStar; faStar = faStar;
  // ARTICLE EDIT MODE: ON/OFF
  public editOn: boolean = false;

  // USER-INFO TO SHOW
  public pickedUserProfile: UserProfile = {
    username: "",
    bio: "",
    image: ""
  }

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private profile: ProfileService
  ) { }

  ngOnInit(): void {
    this.articleService.get(this.articleService.chosenSlug).subscribe(
      (res: any) => {
        this.showArticle = res.article;
        if (this.auth.currentUserValue) {
          this.loggedIn = Boolean(this.auth.currentUserValue.username);
        } else this.loggedIn = false;
      }
      );
  }

  // NAVIGATION TO THE ARTICLE FORM COMPONENT WITH THE CHOSEN ARTICLE IN PARAMETER
  editArticle(slug: string) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['article', 'form', slug])
    } else this.toastr.warning('Please log in to edit the article!', 'Warning!');
  }


  // COMMENTING SECTION
  submitComment(comment: NgForm) {
    this.articleService.createComment(comment.form.value, this.articleService.chosenSlug).subscribe(
      res => {
        this.ngOnInit();
        comment.resetForm();
      }
    )
  }
  showEditComment() {
    this.editOn = !this.editOn;
  }
  deleteComment(id: number) {
    this.articleService.deleteComment(id, this.articleService.chosenSlug).subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }

  // TOGGLE FAVORITE SECTION
  toggleFavorite(slug: string | undefined, isFavorite?: boolean) {
    if (!isFavorite) {
      this.articleService.favorite(slug).subscribe(
        res => {
          this.articleService.get(this.articleService.chosenSlug).subscribe(
            (res: any) => {
              this.showArticle = res.article;
              this.loggedIn = Boolean(this.auth.currentUserValue.username);
            }
            );
        },
        err => {
          this.toastr.warning("Please sign in to favourite!", "Warning!")
        }
      )
    } else {
      this.articleService.deFavorite(slug).subscribe(
        res => {
          this.ngOnInit();
        },
        err => {
          this.toastr.error("Please sign in!", "Error")
        }
      )
    }
  }

  //SHOW COMMENTER USER PROFILE
  public showUser(username: string) {
    this.profile.getProfileInfo(username).subscribe(
      (res) => {
        console.log(res);
        this.pickedUserProfile = res.profile;
        console.log(this.pickedUserProfile);
      },
      (err) => console.log(err)
      )
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
