import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string;
  command?: () => void;
  separator?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Períodos Académicos',
      icon: 'pi pi-calendar',
      routerLink: '/academic-terms'
    },
    {
      label: 'Cursos',
      icon: 'pi pi-book',
      routerLink: '/courses'
    },
    {
      label: 'Estudiantes',
      icon: 'pi pi-users',
      routerLink: '/students'
    },
    {
      label: 'Tareas',
      icon: 'pi pi-clipboard',
      routerLink: '/tasks'
    },
    {
      separator: true
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
