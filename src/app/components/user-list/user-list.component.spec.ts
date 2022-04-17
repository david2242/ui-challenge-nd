import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { UserInterface } from 'src/app/model/user';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let helper: Helper;
  let dh: DOMHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    helper = new Helper();
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not contain any list of users, when getting no user', () => {
    expect(dh.countTags('tr')).toBe(0);
  })

  it('should contain 10 row of table of user list (+ one header), when giving 10 user into the list', fakeAsync(() => {
    component.loggedIn = helper.makeFakeUsers(1)[0];
    component.userList = helper.makeFakeUsers(10);
    fixture.detectChanges();
    tick();
    expect(dh.countTags('tr')).toBe(11);
  }));

});

class UserServiceStub {
  getAll() {
    return of([]);
  }
}

class AuthServiceStub { }

class Helper {
  users: UserInterface[] = []
  makeFakeUsers(amout: number): UserInterface[] {
    this.users = [];
    for (let index = 0; index < amout; index++) {
      this.users.push({
        id: 1,
        username: "Gipsz Jakab",
        email: "gipsz@beton.com",
        password: "dummyPassword",
        bio: "Gipsz Jakab a legjobb csávó!",
        image: "kép a csodálatos Gipsz Jakabról",
        token: "dummyToken"
      });
    }
    return this.users;
  }
}

class DOMHelper {

  constructor(private fixture: ComponentFixture<UserListComponent>) {}

  public countTags(tagName: string): number {
    const tagRefs = this.fixture.debugElement.queryAll(By.css(tagName));
    return tagRefs.length;
  }

}