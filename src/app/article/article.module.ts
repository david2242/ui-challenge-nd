import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

const routes: Routes = [
  {path: "", component: ArticleListComponent},
  {path: "form", component: ArticleFormComponent},
  {path: "form/:index", component: ArticleFormComponent},
  {path: "list", component: ArticleListComponent},
  {path: "show", component: ArticleComponent}
];

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleFormComponent,
    ArticleListComponent,
    ProfileModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    TagInputModule,
    // BrowserAnimationsModule
  ]
})
export class ArticleModule { }
