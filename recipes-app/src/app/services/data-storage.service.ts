import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from './recipe.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  serverURL = 'https://angularcourseprojectrecipes-default-rtdb.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    this.http.put(this.serverURL + 'recipes.json', recipes).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.serverURL + 'recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}