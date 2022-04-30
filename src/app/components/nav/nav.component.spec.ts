import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import {Location} from '@angular/common';


import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'article/form', component: DummyComponent},
          {path: 'article/list', component: DummyComponent},
          {path: 'user/reglog', component: DummyComponent},
          {path: 'user/list', component: DummyComponent}
        ])
      ],
      declarations: [
        NavComponent,
        DummyComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ToastrService, useClass: ToastrServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to new article', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links[2].nativeElement.innerText).toBe('New Article');
  });

  it('should be at the location "/" before click on navigation menu', () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  })

  it('should navigate to /article/form on menu click', fakeAsync(() => {
    const location = TestBed.get(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const linkButton: HTMLAnchorElement = links[2].nativeElement;
    linkButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/article/form');
  }));

  it('should navigate to /article/list on menu click', fakeAsync(() => {
    const location = TestBed.get(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const linkButton: HTMLAnchorElement = links[3].nativeElement;
    linkButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/article/list');
  }));

  it('should navigate to /user/reglog on menu click', fakeAsync(() => {
    const location = TestBed.get(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const linkButton: HTMLAnchorElement = links[5].nativeElement;
    linkButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/user/reglog');
  }));

  it('should navigate to /user/list on menu click', fakeAsync(() => {
    const location = TestBed.get(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const linkButton: HTMLAnchorElement = links[6].nativeElement;
    linkButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/user/list');
  }));

});

class AuthServiceStub {
  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject({
    bio: "davidka bio",
    email: "email@email.hu",
    id: 3,
    image: "davidka image",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkYXZpZGthIiwiZW1haWwiOiJlbWFpbEBlbWFpbC5odSIsImV4cCI6MTY1NTE1MzU0Ny44MTMsImlhdCI6MTY0OTk2OTU0N30.JFDc6U82zWFU947ure60b4YJMJFlKRdzUu0c6W2phuw",
    username: "davidka"
  });
}

class ToastrServiceStub { }

@Component({ template: ''})
class DummyComponent {}


