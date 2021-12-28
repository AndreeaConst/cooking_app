export class Recipe {
  RecipeId!: number;
  Name: string;
  CaloriesNo!: number;
  Description!: string;
  Image!: string;
  PreparingTime!: number;
  Servings!: number;
  constructor(Name:string){
      this.Name=Name;
  }
}
