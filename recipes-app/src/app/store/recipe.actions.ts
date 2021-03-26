import { Action } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";

export const SET_RECIPES = '[Recipe] Set Recipes';

export type RecipeActions = SetRecipes;

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    public payload: Recipe[];

    constructor(payload: Recipe[]) {
        this.payload = payload;
    }
}