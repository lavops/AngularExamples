import { Action } from "@ngrx/store";
import { Ingredient } from "../models/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    public payload: Ingredient;

    constructor(payload: Ingredient) {
        this.payload = payload;
    }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    public payload: Ingredient[];

    constructor(payload: Ingredient[]) {
        this.payload = payload;
    }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    public payload: Ingredient;

    constructor(payload: Ingredient) {
        this.payload = payload;
    }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    public payload: number;

    constructor(payload: number) {
        this.payload = payload;
    }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}