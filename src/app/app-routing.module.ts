import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
// import { ArticleFormComponent } from './components/article-form/article-form.component';
// import { ArticleListComponent } from './components/article-list/article-list.component';
// import { ArticleComponent } from './article/article/article.component';
// import { UserDetailsComponent } from './user/user-details/user-details.component';
// import { UserListComponent } from './components/user-list/user-list.component';
// import { UserReglogComponent } from './components/user-reglog/user-reglog.component';

const routes: Routes = [
  // {path: "", component: ArticleListComponent},
  {path: "", loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  {path: "user", loadChildren: () => import('./user/user.module').then(u => u.UserModule)},
  {path: "article", loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  // {path: "article-form", component: ArticleFormComponent},
  // {path: "article/:index", component: ArticleFormComponent},
  // {path: "article-list", component: ArticleListComponent},
  // {path: "article-show", component: ArticleComponent},
  // {path: "user-reglog", component: UserReglogComponent},
  // {path: "user-list", component: UserListComponent},
  // {path: "user-details", component: UserDetailsComponent},
  // {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
