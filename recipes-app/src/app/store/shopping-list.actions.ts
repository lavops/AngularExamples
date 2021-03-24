import { Action } from "@ngrx/store";
import { Ingredient } from "../models/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;
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
    public payload: {index: number, ingredient: Ingredient};

    constructor(payload: {index: number, ingredient: Ingredient}) {
        this.payload = payload;
    }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    public payload: number; //just ID

    constructor(payload: number) {
        this.payload = payload;
    }
}