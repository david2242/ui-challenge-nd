import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';

import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let helper: Helper;
  let dh: DOMHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListComponent ],
      providers: [
        {provide: ArticleService, useClass: ArticleServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: ProfileService, useClass: ProfileServiceStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    helper = new Helper();
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should contain 4 article-cards when giving 4 fake article data', () => {
    component.articleList = helper.fillArticles(4 )
    fixture.detectChanges();
    expect(dh.countTags('.card')).toBe(4);
  });

  it('should contain 1 h5 card title when getting one article', () => {
    component.articleList = helper.fillArticles(1)
    fixture.detectChanges();
    expect(dh.countTags('.card-title')).toBe(1);
  });

  it('should contain the title in the h5 element', () => {
    component.articleList = helper.fillArticles(1)
    fixture.detectChanges();
    const articleTitleRefs = fixture.debugElement.queryAll(By.css('.card-title'));
    const articleTitle: HTMLHeadingElement = articleTitleRefs[0].nativeElement;
    const article = component.articleList[0];
    expect(articleTitle.innerText).toBe(article.title);
  });

  it('should contain 2 article body when getting 2 article', () => {
    component.articleList = helper.fillArticles(2);
    fixture.detectChanges();
    expect(dh.countTags('.card-text')).toBe(2);
  })

});

class ArticleServiceStub {
  getAll() {
    return of([]);
  }
}
class RouterStub{}
class AuthServiceStub{}
class ProfileServiceStub{}

class Helper {
  articles: Article[] = [];
  fillArticles(amount: number): Article[] {
    for (let index = 0; index < amount; index++) {
      this.articles.push({
        title: "DummyTitle",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et q",
        body: "architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        tagList: ["tag1", "tag2", "tag3"]
      })
    }
    return this.articles;
  }
}

class DOMHelper {

  constructor(private fixture: ComponentFixture<ArticleListComponent> = fixture) {}

  countTags(tagName: string): number {
    const tagRefs = this.fixture.debugElement.queryAll(By.css(tagName));
    return tagRefs.length;
  }

}