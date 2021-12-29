import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.less']
})

export class RecipesPageComponent implements OnInit {

  responseRecipe!:Recipe;
  recipes:Recipe[]=[];
  @ViewChild('noRecipesDiv', { static: false })noRecipesDivRef!: ElementRef;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private renderer: Renderer2,
    private localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllRecipes();
    // this.recipes=[
    //   {RecipeId: 1, Name: 'Cookie', CaloriesNo: 100, Description: 'bla bla', Image: 'bla bla', PreparingTime: 60, Servings: 1},
    //   {RecipeId: 2, Name: 'Macaroni', CaloriesNo: 500, Description: 'bla bla', Image: 'bla bla', PreparingTime: 30, Servings: 1},
    //   {RecipeId: 3, Name: 'Spaghetti', CaloriesNo: 450, Description: 'bla bla', Image: 'bla bla', PreparingTime: 25, Servings: 1},
    //   {RecipeId: 4, Name: 'Pancakes', CaloriesNo: 325, Description: 'bla bla', Image: 'bla bla', PreparingTime: 30, Servings: 1},
    //   {RecipeId: 5, Name: 'Pizza', CaloriesNo: 450, Description: 'bla bla', Image: 'bla bla', PreparingTime: 125, Servings: 1},
    //   {RecipeId: 6, Name: 'Hamburger', CaloriesNo: 268, Description: 'bla bla', Image: 'bla bla', PreparingTime: 15, Servings: 1},
    //   {RecipeId: 7, Name: 'Vegetarian Pizza', CaloriesNo: 450, Description: 'bla bla', Image: 'bla bla', PreparingTime: 125, Servings: 1},
    //   {RecipeId: 8, Name: 'Potatoes with cheese', CaloriesNo: 380, Description: 'bla bla', Image: 'bla bla', PreparingTime: 40, Servings: 1},
    //   {RecipeId: 9, Name: 'Fruit salad with sea fruit', CaloriesNo: 100, Description: 'bla bla', Image: 'bla bla', PreparingTime: 60, Servings: 1},
    //   {RecipeId: 10, Name: 'Tomato soup', CaloriesNo: 260, Description: 'bla bla', Image: 'bla bla', PreparingTime: 60, Servings: 1},
    // ];
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

  async searchByName(event:any) {
     this.recipes=[];
     const inputRecipe = new Recipe(event.target.value);   

     if(event.target.value=="")
     {
       this.getAllRecipes();
     } 
     else    
     { 
      this.recipeService.searchRecipeByName(inputRecipe).subscribe(
      (response) => {
        if(response.length>0)
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

  routingToRecipeDetails(recipe: Recipe){
    this.localStorage.store('recipe', recipe);
    this.router.navigate(['recipes/recipe'])
  }
    
}
   

