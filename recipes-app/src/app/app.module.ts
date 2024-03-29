import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './store/recipe.effects';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //RecipesModule, => Izbacen zbog Lazy Loading-a u app-routing.module.ts
    //ShoppingListModule, => Izbacen zbog Lazy Loading-a u app-routing.module.ts
    //AuthModule, => Izbacen zbog Lazy Loading-a u app-routing.module.ts
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthEffects, 
      RecipeEffects
    ]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    //StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
