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

  hide = true;
  recipeForm: FormGroup = new FormGroup({});
  @ViewChild('noRecipesDiv', { static: false })noRecipesDivRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getAllRecipes();
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
     this.inputRecipe=new Recipe(event.target.value);   
     console.log(event.target.value);
     if(event.target.value=="")
     {
       this.getAllRecipes();
     } 
     else    
     { 
      this.recipeService.searchRecipeByName(this.inputRecipe).subscribe(
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
    
  }
   

