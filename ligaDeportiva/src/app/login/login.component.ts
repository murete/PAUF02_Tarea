import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isRegisterMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.isRegisterMode) {
        this.register(username, password);
      } else {
        this.login(username, password);
      }
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (role) => {
        this.successMessage = 'Inicio de sesión exitoso.';
        this.errorMessage = '';
        this.redirectByRole(role);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
        this.successMessage = '';
      }
    });
  }

  register(username: string, password: string) {
    this.authService.register(username, password).subscribe({
      next: () => {
        this.successMessage = 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.';
        this.errorMessage = '';
        this.isRegisterMode = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar';
        this.successMessage = '';
      }
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  private redirectByRole(role: string) {
    switch (role) {
      case 'usuario':
        this.router.navigate(['/index-usuario']);
        break;
      case 'administrador':
        this.router.navigate(['/index-administrador']);
        break;
      case 'capitan':
        this.router.navigate(['/index-capitan']);
        break;
      case 'arbitro':
        this.router.navigate(['/index-arbitro']);
        break;
      default:
        this.errorMessage = 'Rol no reconocido';
    }
  }
}
