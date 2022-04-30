import { HttpBackend, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        {provide: UserService, useClass: UserServiceStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: HttpBackend, useClass: HttpBackendStub},
        {provide: HttpClient, useClass: HttpClientStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class UserServiceStub {}
class AuthServiceStub {}
class ToastrServiceStub {}
class HttpBackendStub {}
class HttpClientStub {}