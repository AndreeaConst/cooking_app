import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesIngredientsPageComponent } from './recipes-ingredients-page.component';

describe('RecipesIngredientsPageComponent', () => {
  let component: RecipesIngredientsPageComponent;
  let fixture: ComponentFixture<RecipesIngredientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesIngredientsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesIngredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
