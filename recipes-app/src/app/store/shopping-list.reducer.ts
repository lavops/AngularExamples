import { Action } from "@ngrx/store";
import { Ingredient } from "../models/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
};

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',  5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state, ingredients: [...state.ingredients, action.payload]};
    
        case ShoppingListActions.ADD_INGREDIENTS:
            return {...state, ingredients: [...state.ingredients, ...action.payload]};
            
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {...ingredient, ...action.payload};
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {...state, ingredients: updatedIngredients, editedIngredientIndex: -1, editedIngredient: null};

        case ShoppingListActions.DELETE_INGREDIENT:
            return {...state, ingredients: state.ingredients.filter((ingredient, ingredientIndex) => { // Funkcija mora da primi dva argumenta objekat i njego ID u array-u
                return ingredientIndex != state.editedIngredientIndex;
            }), editedIngredientIndex: -1, editedIngredient: null};

        case ShoppingListActions.START_EDIT:
            return {...state, editedIngredientIndex: action.payload, editedIngredient: {...state.ingredients[action.payload]} } // {...state.ingredients[action.payload]} ZBOG REFERENCE
        
        case ShoppingListActions.START_EDIT:
            return {...state, editedIngredientIndex: -1, editedIngredient: null }

        default:
            return state;
    }
}