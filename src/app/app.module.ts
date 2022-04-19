import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserReglogComponent } from './components/user-reglog/user-reglog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ArticleComponent } from './components/article/article.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ArticleFormComponent,
    ArticleListComponent,
    UserReglogComponent,
    UserListComponent,
    UserDetailsComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
