import { Component, inject } from '@angular/core';
import { Confirmation, Session } from '../../models/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirmation',
  imports: [ReactiveFormsModule],
  templateUrl: './confirmation.component.html'
})
export default class ConfirmationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  errorMessage: string = '';

  confirmationForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  confirm() {
    this.errorMessage = '';

    if (this.confirmationForm.invalid) {
      this.errorMessage = 'Por favor, ingrese el codigo de confirmación';
      return
    }

    const confirmation: Confirmation = this.confirmationForm.getRawValue();

    this.authService.confirmation(confirmation).subscribe({
      next: (response: Session) => {

      },
      error: (error) => {
        this.handleErrorConfirmation(error);
      }
    })
  }

  handleErrorConfirmation(error: any) {

  }

  toLogin() {
    this.router.navigate(['/session/login']);
  }
}
