import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TaskResponseDTO } from '../../../../core/api/models/TaskResponseDTO';
import { TasksService } from '../../../../core/api/services/TasksService';
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
  tasks: TaskResponseDTO[] = [];
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
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    
    TasksService.getAllTasks().then((response: any) => {
      this.tasks = response.content || [];
      this.totalRecords = response.totalElements || 0;
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar tareas');
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadTasks();
  }

  filterByStatus(): void {
    this.first = 0;
    this.loadTasks();
  }

  createNew(): void {
    this.router.navigate(['/tasks/new']);
  }

  edit(task: TaskResponseDTO): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  disable(task: TaskResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de deshabilitar la tarea ${task.title}?`,
      header: 'Confirmar Deshabilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, deshabilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        TasksService.disableTask(task.id!).then(() => {
          this.toastService.success('Tarea deshabilitada exitosamente');
          this.loadTasks();
        }).catch(() => {
          this.toastService.error('Error al deshabilitar tarea');
        });
      }
    });
  }

  enable(task: TaskResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de habilitar la tarea ${task.title}?`,
      header: 'Confirmar Habilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, habilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        TasksService.enableTask(task.id!).then(() => {
          this.toastService.success('Tarea habilitada exitosamente');
          this.loadTasks();
        }).catch(() => {
          this.toastService.error('Error al habilitar tarea');
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
