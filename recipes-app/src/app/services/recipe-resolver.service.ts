import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";

import { Recipe } from '../models/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new RecipeActions.FetchRecipes());

    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
  }
}
