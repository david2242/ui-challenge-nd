import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleComponent } from './components/article/article.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserReglogComponent } from './components/user-reglog/user-reglog.component';

const routes: Routes = [
  {path: "", component: ArticleListComponent},
  {path: "article-form", component: ArticleFormComponent},
  {path: "article/:index", component: ArticleFormComponent},
  {path: "article-list", component: ArticleListComponent},
  {path: "article-show", component: ArticleComponent},
  {path: "user-reglog", component: UserReglogComponent},
  {path: "user-list", component: UserListComponent},
  {path: "user-details", component: UserDetailsComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
