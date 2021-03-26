import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../../models/recipe.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subsription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private recipesService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subsription = this.store.select('recipe').pipe(map(recipeState => {
      return recipeState.recipes;
    })).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
