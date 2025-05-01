import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login, Session } from '../../models/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage: string = '';
  showPassword = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });

  login() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const login: Login = this.loginForm.getRawValue();

    this.authService.login(login).subscribe({
      next: (value: Session) => {
      },
      error: (error) => {
        this.handleErrorLogin(error);
      }
    })

  }

  handleErrorLogin(error: any) {
    const erroCode: number = error.status
    switch (erroCode) {
      case 401:
        break
    }
  }

  toRegister() {
    this.router.navigate(['/session/register']);
  }

  toFind() {
    this.router.navigate(['/session/find']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}