import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      providers: [
        {provide: ArticleService, useClass: ArticleServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: ProfileService, useClass: ProfileServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ArticleServiceStub {
  get() {
    return of();
  }
}

class RouterStub {}
class ToastrServiceStub {}
class AuthServiceStub {}
class ProfileServiceStub {}