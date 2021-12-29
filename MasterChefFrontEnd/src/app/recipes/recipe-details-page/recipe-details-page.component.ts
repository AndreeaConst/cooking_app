import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.less']
})
export class RecipeDetailsPageComponent implements OnInit {
    c = 1;
    @ViewChild('ingredDiv', { static: false })ingredDivRef!: ElementRef;
    @ViewChild('prepDiv', { static: false })prepDivRef!: ElementRef;
    selectedRecipe!: Recipe;

    constructor(private renderer: Renderer2, private recipeService: RecipeService,) { 
      this.selectedRecipe = recipeService.selectedRecipe;
    }

    ngOnInit(): void {
    }
   
    open_close(){
        if(this.c % 2 == 0){    
        document.querySelector('.cont_modal')!.className = "cont_modal cont_modal_active";  
        this.c += 1;
        }else {
        document.querySelector('.cont_modal')!.className = "cont_modal";  
        this.c += 1;    
        }  
    } 

    onClickPrep(){
      this.renderer.setStyle(this.ingredDivRef.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.prepDivRef.nativeElement, 'display', 'block');
    }

    onClickIngredients(){
      this.renderer.setStyle(this.prepDivRef.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.ingredDivRef.nativeElement, 'display', 'block');
    }
  

}
