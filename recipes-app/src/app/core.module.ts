import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";
import { DataStorageService } from "./services/data-storage.service";
import { RecipeService } from "./services/recipe.service";

@NgModule({
    providers: [
        RecipeService,
        DataStorageService,
        AuthService,
        AuthGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule{}