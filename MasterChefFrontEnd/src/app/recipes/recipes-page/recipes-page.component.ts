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

  recipes:Recipe[]=[];
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
