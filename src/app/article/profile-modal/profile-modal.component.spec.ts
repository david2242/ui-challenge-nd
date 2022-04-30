import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';

import { ProfileModalComponent } from './profile-modal.component';

describe('ProfileModalComponent', () => {
  let component: ProfileModalComponent;
  let fixture: ComponentFixture<ProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ProfileService, useClass: ProfileServiceStub},
        {provide: AuthService, useClass: AuthServiceStub}
      ],
      declarations: [ ProfileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ProfileServiceStub {}
class AuthServiceStub {
  currentUserValue = {
    username : "bongo"
  }
}