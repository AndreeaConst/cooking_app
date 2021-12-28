import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  recipeForm: FormGroup = new FormGroup({});
  @ViewChild('noRecipesDiv', { static: false })noRecipesDivRef!: ElementRef;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private renderer: Renderer2
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
       if(response.Name!=null)
       {
         this.responseRecipe=response;
         this.recipes.push(this.responseRecipe);
         this.renderer.setStyle(this.noRecipesDivRef.nativeElement, 'display', 'block');
       }
       else
       {
        this.renderer.setStyle(this.noRecipesDivRef.nativeElement, 'display', 'block');
       }
      });
    }
    
  }
   

