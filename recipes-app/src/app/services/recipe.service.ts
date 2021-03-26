import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
