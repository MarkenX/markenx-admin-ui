import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent implements OnInit, OnDestroy {
  showWarning: boolean = false;
  private checkInterval?: Subscription;
  private readonly WARNING_TIME = 60000; // 1 minuto antes de expirar

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar cada 10 segundos
    this.checkInterval = interval(10000).subscribe(() => {
      this.checkTokenExpiration();
    });
  }

  ngOnDestroy(): void {
    this.checkInterval?.unsubscribe();
  }

  private checkTokenExpiration(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.showWarning = false;
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir a milisegundos
      const now = Date.now();
      const timeUntilExpiry = exp - now;

      // Mostrar advertencia si falta 1 minuto o menos
      if (timeUntilExpiry > 0 && timeUntilExpiry <= this.WARNING_TIME && !this.showWarning) {
        this.showWarning = true;
      }

      // Cerrar sesión automáticamente si ya expiró
      if (timeUntilExpiry <= 0) {
        this.handleLogout();
      }
    } catch (e) {
      console.error('Error al verificar expiración del token', e);
    }
  }

  handleExtendSession(): void {
    // Refrescar el token usando refresh token
    this.refreshToken();
    this.showWarning = false;
  }

  handleLogout(): void {
    this.showWarning = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private refreshToken(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.handleLogout();
      return;
    }

    // Llamar al endpoint de refresh token de Keycloak
    this.authService.refreshToken(refreshToken).subscribe({
      next: () => {
        // Token refrescado exitosamente
      },
      error: () => {
        // Si falla el refresh, cerrar sesión
        this.handleLogout();
      }
    });
  }
}
