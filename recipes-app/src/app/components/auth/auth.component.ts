import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private storeSubsription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSubsription = this.store.select('auth').subscribe(authSate => {
      this.isLoading = authSate.loading;
      this.error = authSate.authError;
    })
  }

  ngOnDestroy() {
    this.storeSubsription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.error = null;

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }
    else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
