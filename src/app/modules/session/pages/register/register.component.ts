import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router);

  showPassword = false;
  errorMessage: string = '';

  registerForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return
    }

    const register: Register = this.registerForm.getRawValue();

    register.roleId = Number(register.roleId)

    this.authService.register(register).subscribe({
      next: () => {

      },
      error: (error) => {
        this.handlerErrorRegister(error);
      }
    })
  }

  handlerErrorRegister(error: any) {
    const erroCode: number = error.error.status
    switch (erroCode) {
      case 409:

        break
      case 500:
        break
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toLogin() {
    this.router.navigate(['/session/login']);
  }

}
