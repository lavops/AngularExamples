import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(
    private recipesService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  onAddShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
