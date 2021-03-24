import { Action } from "@ngrx/store";
import { Ingredient } from "../models/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export type ShoppingListActions = AddIngredient | AddIngredients;
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