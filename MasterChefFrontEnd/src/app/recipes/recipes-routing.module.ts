import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';

const routes: Routes = [
    {
        path: '',
        component: RecipesPageComponent
    },
    {
        path:'recipe',
        component: RecipeDetailsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
