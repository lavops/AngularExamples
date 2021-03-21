import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {
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
      authObservable = this.authService.login(email, password);
    }
    else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(response => {
        //console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      }, error => {
        this.error = error;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
