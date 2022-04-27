import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserReglogComponent } from './user-reglog/user-reglog.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: "", component: UserReglogComponent},
  {path: "reglog", component: UserReglogComponent},
  {path: "list", component: UserListComponent},
  {path: "details", component: UserDetailsComponent},
];

@NgModule({
  declarations: [
    UserDetailsComponent,
    UserListComponent,
    UserReglogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class UserModule { }
