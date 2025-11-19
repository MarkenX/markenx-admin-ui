import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OpenAPI } from '../../api/core/OpenAPI';
import { KEYCLOAK_CONFIG } from '../keycloak.config';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface UserInfo {
  email: string;
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly KEYCLOAK_URL = `${KEYCLOAK_CONFIG.url}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect`;
  
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializar token en OpenAPI config si existe
    const token = this.getToken();
    if (token) {
      OpenAPI.TOKEN = token;
    }
  }

  login(email: string, password: string): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', KEYCLOAK_CONFIG.clientId);
    body.set('username', email);
    body.set('password', password);
    body.set('scope', 'openid profile email');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(`${this.KEYCLOAK_URL}/token`, body.toString(), { headers })
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
          this.authStatusSubject.next(true);
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error('Credenciales inválidas'));
        })
      );
  }

  logout(): void {
    this.clearTokens();
    // Limpiar token de OpenAPI config
    OpenAPI.TOKEN = undefined;
    this.authStatusSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken() && !this.isTokenExpired();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    // Actualizar OpenAPI config con el token
    OpenAPI.TOKEN = token;
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch (e) {
      return true;
    }
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.realm_access?.roles || [];
      return roles.includes(role);
    } catch (e) {
      return false;
    }
  }

  getCurrentUser(): Observable<UserInfo> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userInfo: UserInfo = {
        email: payload.email || payload.preferred_username || '',
        name: payload.name || payload.email || '',
        roles: payload.realm_access?.roles || []
      };
      return new Observable(observer => {
        observer.next(userInfo);
        observer.complete();
      });
    } catch (e) {
      return throwError(() => new Error('Invalid token'));
    }
  }

  refreshToken(refreshToken: string): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', KEYCLOAK_CONFIG.clientId);
    body.set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(`${this.KEYCLOAK_URL}/token`, body.toString(), { headers })
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
          this.authStatusSubject.next(true);
        }),
        catchError(error => {
          console.error('Refresh token error:', error);
          return throwError(() => new Error('No se pudo refrescar el token'));
        })
      );
  }
}
