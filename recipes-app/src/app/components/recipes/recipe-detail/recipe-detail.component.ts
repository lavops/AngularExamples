import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../../models/recipe.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }), 
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }), 
      map(recipeState => {
        return recipeState.recipes.find((recipe, recipeIndex) => {
          return recipeIndex === this.id;
        });
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });

  }

  onAddShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
