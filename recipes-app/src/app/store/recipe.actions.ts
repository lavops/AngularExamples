import { Action } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";

export const SET_RECIPES = '[Recipe] Set Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipes';

export type RecipeActions = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipes;

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

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    public payload: Recipe;

    constructor(payload: Recipe) {
        this.payload = payload;
    }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    public payload: {index: number, recipe: Recipe};

    constructor(payload: {index: number, recipe: Recipe}) {
        this.payload = payload;
    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    public payload: number;

    constructor(payload: number) {
        this.payload = payload;
    }
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}