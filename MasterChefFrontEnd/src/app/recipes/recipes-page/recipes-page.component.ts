import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

/*export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}*/
@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.less']
})

export class RecipesPageComponent implements OnInit {

  recipeName='';
  responseRecipe!:Recipe;
  recipes:Recipe[]=[];
  inputRecipe!:Recipe;  

  hide = true;
  recipeForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /*this.recipeService.getRecipe().subscribe(
      (response) => {
        if(response!=null)
        {
            this.recipes=response;
          
        }
        else
        {
          alert("Nu exista retete!")
        }
       }
    );*/
  }



  async searchByName(event:any) {
    this.recipes=[];
     this.inputRecipe=new Recipe(event.target.value);           
    this.recipeService.searchRecipeByName(this.inputRecipe).subscribe(
     (response) => {
       if(response.length>0)
       {

         console.log(response);
        for(let i=0; i<response.length; i++)
        {
            this.recipes.push(response[i]);
        }
        
       }
       else
       {
         alert("Nu am gasit reteta!")
       }
      }
      
      );
    }
    
  }
   

