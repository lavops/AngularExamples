import { Action } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";

export const SET_RECIPES = '[Recipe] Set Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';

export type RecipeActions = SetRecipes | FetchRecipes;

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    public payload: Recipe[];

    constructor(payload: Recipe[]) {
        this.payload = payload;
    }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}