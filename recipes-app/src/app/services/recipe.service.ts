import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      "Sarma", 
      "Ovo je recept za sarmu", 
      "https://www.blondelish.com/wp-content/uploads/2020/04/Keto-Stuffed-Cabbage-Rolls-Gluten-Free-Low-Carb-Recipe-10.jpg",
      [
        new Ingredient("Kupus", 1),
        new Ingredient("Meso", 5)
      ]
    ),
    new Recipe(
      "Burger", 
      "Ovo je recept za Burger", 
      "https://happilyunprocessed.com/wp-content/uploads/2018/03/Juicest-Burger-Everfeature.jpg.jpg",
      [
        new Ingredient("Meso", 1),
        new Ingredient("Luk", 1)
      ]
    ),
  ];

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    this.recipesChanged.next(this.recipes.slice());
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
