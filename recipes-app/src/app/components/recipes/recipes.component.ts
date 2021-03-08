import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(
    private recipesService: RecipeService
  ) { 
    recipesService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    })
  }

  ngOnInit(): void {
  }
}
