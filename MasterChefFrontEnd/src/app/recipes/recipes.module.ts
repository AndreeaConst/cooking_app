import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    RecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MatIconModule,
    MatGridListModule
  ]
})
export class RecipesModule { }
