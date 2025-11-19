import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'markenx-admin-ui';
  loading$: Observable<boolean>;
  private tokenCheckSubscription?: Subscription;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    // Verificar token cada minuto
    this.tokenCheckSubscription = interval(60000).subscribe(() => {
      if (!this.authService.isAuthenticated() && this.router.url !== '/login') {
        this.toastService.warning('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.tokenCheckSubscription?.unsubscribe();
  }
}
