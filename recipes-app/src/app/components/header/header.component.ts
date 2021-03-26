import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataStorageService } from 'src/app/services/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
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
    this.store.dispatch(new AuthActions.Logout());
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {
    });
  }
}
