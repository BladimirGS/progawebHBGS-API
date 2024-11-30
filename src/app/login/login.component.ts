import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../services/user.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  error: string = '';
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  
  errorMessage = signal('');
  hide = signal(true);

  constructor(private router: Router, private userService: UserService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit() {
    if (this.email.valid && this.password) {
      this.userService.authenticate(this.email.value!, this.password)
        .subscribe(authenticated => {
          if (authenticated) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Correo electrónico o contraseña incorrectos';
          }
        });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente.';
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debes ingresar un valor');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('No es un correo válido');
    } else {
      this.errorMessage.set('');
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
