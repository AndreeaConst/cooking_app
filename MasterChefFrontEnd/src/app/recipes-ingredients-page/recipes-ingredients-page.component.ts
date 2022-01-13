import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Ingredient } from '../interfaces/ingredient';
import { Recipe } from '../interfaces/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes-ingredients-page',
  templateUrl: './recipes-ingredients-page.component.html',
  styleUrls: ['./recipes-ingredients-page.component.less']
})
export class RecipesIngredientsPageComponent implements OnInit {

  responseRecipe!:Recipe;
  recipes:Recipe[]=[];
  ingredientNames: string[] = [];
  recipeName!: string;
  @ViewChild('noRecipesDiv', { static: false })noRecipesDivRef!: ElementRef;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private renderer: Renderer2,
    private localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    if(!this.localStorage.retrieve('ingredientNames'))
    {
      this.getAllRecipes();
    }
    else
    {
      this.recipes=this.localStorage.retrieve('recipes');
      this.ingredientNames=this.localStorage.retrieve('ingredientNames');
    }
    
  }

  async getAllRecipes(){
    this.recipes=[];
    this.recipeService.getRecipe().subscribe(
      (response) => {
        if(response!=null)
        {
            this.recipes=response;
            this.renderer.setStyle(this.noRecipesDivRef.nativeElement, 'display', 'none');
          
        }
        else
        {
          this.renderer.setStyle(this.noRecipesDivRef.nativeElement, 'display', 'block');
        }
       }
    );
  }

  public sortByPrepTime() {
    this.recipes.sort((recipe1, recipe2) => {
      let recipe1PrepTime = recipe1.PreparingTime;
      let recipe2PrepTime = recipe2.PreparingTime;
  
      if (recipe1PrepTime < recipe2PrepTime) {
          return -1;
      }
      if (recipe1PrepTime > recipe2PrepTime) {
          return 1;
      }
      return 0;
    });
  }

  public sortByCaloriesNo() {
    this.recipes.sort((recipe1, recipe2) => {
      let recipe1CaloriesNo = recipe1.CaloriesNo;
      let recipe2CaloriesNo = recipe2.CaloriesNo;
  
      if (recipe1CaloriesNo < recipe2CaloriesNo) {
          return -1;
      }
      if (recipe1CaloriesNo > recipe2CaloriesNo) {
          return 1;
      }
      return 0;
    });
  }

  onAddIngredient(){
    this.ingredientNames.push(this.recipeName);
    this.recipeName = ' ';
  }

  onDeleteIngredient(ingredientName: string){
    this.ingredientNames = this.ingredientNames.filter(el => el !== ingredientName);
  }

  async onFindRecipe(){
    console.log(this.ingredientNames);
    this.recipeService.searchRecipeByIngredients(this.ingredientNames).subscribe(
      (recipes=>{this.recipes=recipes})
    )
  }

  routingToRecipeDetails(recipe: Recipe){
    this.localStorage.store('ingredientNames',this.ingredientNames);
    this.localStorage.store('recipes', this.recipes);
    this.localStorage.store('recipe',recipe);
    this.router.navigate(['../recipes/recipe'])
  }

}
