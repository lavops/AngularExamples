import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  userSubcription: Subscription;
  isAuthenticated = false;
  
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSubcription = this.store.select('auth').pipe(map(authState => {
      return authState.user;
    })).subscribe(user => {
      this.isAuthenticated = !user ? false : true; // !!  user
    });
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {
      //console.log(recipes);
    });
  }
}
