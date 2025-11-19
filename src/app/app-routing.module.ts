import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'academic-terms',
        loadChildren: () => import('./features/academic-terms/academic-terms.module').then(m => m.AcademicTermsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
