import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

import { UserReglogComponent } from './user-reglog.component';

describe('UserReglogComponent', () => {
  let component: UserReglogComponent;
  let fixture: ComponentFixture<UserReglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReglogComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: UserService, useClass: UserServiceStub},
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a label for email input', () => {
    const formLabels = fixture.debugElement.queryAll(By.css('label'));
    expect(formLabels[0].nativeElement.textContent).toBe('Email address');
  })

  it('should contain an input for loginform email', () => {
    const logEmailInput = fixture.debugElement.query(By.css('input'));
    const logEmailInputElement: HTMLInputElement = logEmailInput.nativeElement;
    expect(logEmailInputElement).toBeTruthy();
  })
});

class AuthServiceStub {}
class UserServiceStub {}
class ToastrServiceStub {}
class RouterStub {}