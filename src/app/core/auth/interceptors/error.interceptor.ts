import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          this.toastService.error('Error de conexión. Verifique su red.');
        } else {
          // Error del lado del servidor
          switch (error.status) {
            case 401:
              this.toastService.error('Sesión expirada. Por favor, inicie sesión nuevamente.');
              this.authService.logout();
              this.router.navigate(['/login']);
              break;
            
            case 403:
              this.toastService.error('No tiene permisos para realizar esta acción.');
              break;
            
            case 400:
              const message = this.extractErrorMessage(error);
              this.toastService.error(message);
              break;
            
            case 404:
              this.toastService.error('Recurso no encontrado.');
              break;
            
            case 409:
              this.toastService.error('El recurso ya existe o hay un conflicto.');
              break;
            
            case 500:
              this.toastService.error('Error del servidor. Intente nuevamente más tarde.');
              break;
            
            default:
              this.toastService.error(`Error inesperado: ${error.message}`);
          }
        }
        
        return throwError(() => error);
      })
    );
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.error?.error) {
      return error.error.error;
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    return 'Error de validación. Verifique los datos ingresados.';
  }
}
