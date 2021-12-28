import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MatIconModule,
    MatGridListModule,
   FormsModule, ReactiveFormsModule
  ]
})
export class RecipesModule { }
