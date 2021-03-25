import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authSate => {
      this.isLoading = authSate.loading;
      this.error = authSate.authError;
    })
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
    
    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      //authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }
    else {
      authObservable = this.authService.signup(email, password);
    }

    // authObservable.subscribe(response => {
    //     //console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes'])
    //   }, error => {
    //     this.error = error;
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
