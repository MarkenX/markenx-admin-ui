import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MarkenxMenuItem {
  value: string;
  label: string;
  icon: string;
  route: string;
  subItems?: MarkenxMenuItem[];
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  headerTitle: string = 'MARKENX - PANEL DE ADMINISTRACIÓN';
  userName: string = 'Administrador';
  menuItems: MarkenxMenuItem[] = [
    {
      value: 'students',
      label: 'Estudiantes',
      icon: 'pi pi-users',
      route: '/students'
    },
    {
      value: 'courses',
      label: 'Cursos',
      icon: 'pi pi-book',
      route: '/courses'
    },
    {
      value: 'tasks',
      label: 'Tareas',
      icon: 'pi pi-file-edit',
      route: '/tasks'
    },
    {
      value: 'lessons',
      label: 'Evaluaciones',
      icon: 'pi pi-check-square',
      route: '/lessons'
    },
    {
      value: 'reports',
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      route: '/reports'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: Get user info from auth service
  }

  onLogout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/login']);
  }
}
