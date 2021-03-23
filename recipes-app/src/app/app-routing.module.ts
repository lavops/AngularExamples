import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) }, // Lazy Loading
  { path: 'shopping-list', loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) }, // Lazy Loading
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) } // Lazy Loading
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
