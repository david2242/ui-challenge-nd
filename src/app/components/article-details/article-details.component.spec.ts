import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';

import { ArticleDetailsComponent } from './article-details.component';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDetailsComponent ],
      providers: [
        {provide: ActivatedRoute, useClass: activatedRouteStub},
        {provide: ArticleService, useClass: articleServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class activatedRouteStub {
  snapshot = {
    paramMap : {
      get : function(parameter: string) {
        return "volt-egyszer-egy-verekedos-videojatek-amely-annyira-eroszakos-lett-hogy-megtiltottak-a-kiadasat - e0tnt7";
      } 
    }
  }

}

class articleServiceStub {
  get() {
    return of("volt-egyszer-egy-verekedos-videojatek-amely-annyira-eroszakos-lett-hogy-megtiltottak-a-kiadasat - e0tnt7");
  }
}