import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { ArticleFormComponent } from './article-form.component';
import { UserInterface } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFormComponent ],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: ArticleService, useClass: ArticleServiceStub},
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: AuthService, useClass: AuthServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should containt a "title" label, if logged in', () => {
    component.loggedIn = fakeUser;
    fixture.detectChanges();
    const formLabels = fixture.debugElement.queryAll(By.css('label'));
    expect(formLabels[0].nativeElement.textContent).toBe('Title');
  });

  it('should containt a "description" label, if logged in', () => {
    component.loggedIn = fakeUser;
    fixture.detectChanges();
    const formLabels = fixture.debugElement.queryAll(By.css('label'));
    expect(formLabels[1].nativeElement.textContent).toBe('Description');
  });

  it('should containt a "body" label, if logged in', () => {
    component.loggedIn = fakeUser;
    fixture.detectChanges();
    const formLabels = fixture.debugElement.queryAll(By.css('label'));
    expect(formLabels[2].nativeElement.textContent).toBe('Body');
  });

  it('should containt a "tag" label, if logged in', () => {
    component.loggedIn = fakeUser;
    fixture.detectChanges();
    const formLabels = fixture.debugElement.queryAll(By.css('label'));
    expect(formLabels[3].nativeElement.textContent).toBe('Tags');
  });

  const fakeUser: UserInterface = {
    id: 1,
    username: "tomika44",
    email: "tomika44@tomika.hu",
    password: "tomika",
    token: "daésghaoiesrfase"
  }
});

class ArticleServiceStub {
  get() {
    return of();
  }
}

class RouterStub {}
class ToastrServiceStub {}
class ActivatedRouteStub {
  snapshot = {
    paramMap : {
      get : function(parameter: string) {
        return "volt-egyszer-egy-verekedos-videojatek-amely-annyira-eroszakos-lett-hogy-megtiltottak-a-kiadasat - e0tnt7";
      } 
    }
  }
}
class AuthServiceStub {}