import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../models/recipe.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from './app.reducer';

@Injectable()
export class RecipeEffects {

    private serverURL = 'https://angularcourseprojectrecipes-default-rtdb.firebaseio.com/';

    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>(this.serverURL + 'recipes.json')
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            map(recipes => {
                return new RecipeActions.SetRecipes(recipes);
            })
        );
    })

    storeRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipe')),
            switchMap(([actionData, recipeState]) => {
                return this.http.put(this.serverURL + 'recipes.json', recipeState.recipes);
            })
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}