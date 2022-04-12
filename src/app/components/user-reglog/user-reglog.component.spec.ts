import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReglogComponent } from './user-reglog.component';

describe('UserReglogComponent', () => {
  let component: UserReglogComponent;
  let fixture: ComponentFixture<UserReglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReglogComponent ]
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
});
