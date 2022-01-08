import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { MatIconModule } from '@angular/material/icon';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class RecipesModule { }
