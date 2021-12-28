import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../interfaces/recipe';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getRecipe():Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipeController`);
  }

  public searchRecipeByName(inputRecipe: Recipe):Observable<Recipe> {
    console.log(inputRecipe.Name);
     return this.http.post<Recipe>(`${this.apiServerUrl}/recipeController`, inputRecipe);
   }
}
