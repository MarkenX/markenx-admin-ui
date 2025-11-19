import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CourseResponseDTO } from '../../../../core/api/models/CourseResponseDTO';
import { CoursesService } from '../../../../core/api/services/CoursesService';
import { ToastService } from '../../../../shared/services/toast.service';

interface StatusOption {
  label: string;
  value: string | null;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: CourseResponseDTO[] = [];
  loading: boolean = false;
  
  // Paginación
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  
  // Filtros
  statusOptions: StatusOption[] = [
    { label: 'Todos', value: null },
    { label: 'Habilitados', value: 'ENABLED' },
    { label: 'Deshabilitados', value: 'DISABLED' }
  ];
  selectedStatus: string | null = null;

  constructor(
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    
    CoursesService.getAllCourses().then((response: any) => {
      this.courses = response.content || [];
      this.totalRecords = response.totalElements || 0;
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar cursos');
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadCourses();
  }

  filterByStatus(): void {
    this.first = 0;
    this.loadCourses();
  }

  createNew(): void {
    this.router.navigate(['/courses/new']);
  }

  edit(course: CourseResponseDTO): void {
    this.router.navigate(['/courses/edit', course.id]);
  }

  disable(course: CourseResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de deshabilitar el curso ${course.name}?`,
      header: 'Confirmar Deshabilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, deshabilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        CoursesService.disableCourse(course.id!).then(() => {
          this.toastService.success('Curso deshabilitado exitosamente');
          this.loadCourses();
        }).catch(() => {
          this.toastService.error('Error al deshabilitar curso');
        });
      }
    });
  }

  enable(course: CourseResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de habilitar el curso ${course.name}?`,
      header: 'Confirmar Habilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, habilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        CoursesService.enableCourse(course.id!).then(() => {
          this.toastService.success('Curso habilitado exitosamente');
          this.loadCourses();
        }).catch(() => {
          this.toastService.error('Error al habilitar curso');
        });
      }
    });
  }

  getStatusSeverity(status: string): string {
    return status === 'ENABLED' ? 'success' : 'danger';
  }

  getStatusLabel(status: string): string {
    return status === 'ENABLED' ? 'Habilitado' : 'Deshabilitado';
  }
}
