import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.less']
})

export class RecipesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    
  }

  recipes:Recipe[]=[
    {RecipeId: 1, Name: 'Cookie', CaloriesNo: 100, Description: 'bla bla', Image: 'bla bla', PreparingTime: 60, Servings: 1},
  {RecipeId: 1, Name: 'Salad', CaloriesNo: 100, Description: 'bla bla', Image: 'bla bla', PreparingTime: 60, Servings: 1}];
}
