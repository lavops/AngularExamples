import * as fromShoppingList from './shopping-list.reducer';
import * as fromAuth from './auth.reducer';
import * as fromRecipe from './recipe.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipe: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipe: fromRecipe.recipeReducer
};