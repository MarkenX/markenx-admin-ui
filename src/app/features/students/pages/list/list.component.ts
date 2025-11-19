import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { StudentResponseDTO } from '../../../../core/api/models/StudentResponseDTO';
import { StudentsService } from '../../../../core/api/services/StudentsService';
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
  students: StudentResponseDTO[] = [];
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
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    
    StudentsService.getAllStudents().then((response: any) => {
      this.students = response.content || [];
      this.totalRecords = response.totalElements || 0;
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar estudiantes');
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadStudents();
  }

  filterByStatus(): void {
    this.first = 0;
    this.loadStudents();
  }

  createNew(): void {
    this.router.navigate(['/students/new']);
  }

  edit(student: StudentResponseDTO): void {
    this.router.navigate(['/students/edit', student.id]);
  }

  bulkImport(): void {
    this.router.navigate(['/students/bulk-import']);
  }

  disable(student: StudentResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de deshabilitar al estudiante ${student.firstName} ${student.lastName}?`,
      header: 'Confirmar Deshabilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, deshabilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        StudentsService.disableStudent(student.id!).then(() => {
          this.toastService.success('Estudiante deshabilitado exitosamente');
          this.loadStudents();
        }).catch(() => {
          this.toastService.error('Error al deshabilitar estudiante');
        });
      }
    });
  }

  enable(student: StudentResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de habilitar al estudiante ${student.firstName} ${student.lastName}?`,
      header: 'Confirmar Habilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, habilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        StudentsService.enableStudent(student.id!).then(() => {
          this.toastService.success('Estudiante habilitado exitosamente');
          this.loadStudents();
        }).catch(() => {
          this.toastService.error('Error al habilitar estudiante');
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
