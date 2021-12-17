import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.less']
})
export class RecipeDetailsPageComponent implements OnInit {
  c = 0;
  constructor() { }

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
  

}
