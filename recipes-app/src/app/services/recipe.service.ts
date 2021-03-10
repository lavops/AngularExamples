import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

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
  recipeSelected = new EventEmitter<Recipe>();

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
