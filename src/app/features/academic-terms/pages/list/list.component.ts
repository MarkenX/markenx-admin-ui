import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AcademicPeriodResponseDTO } from '../../../../core/api/models/AcademicPeriodResponseDTO';
import { AcademicTermsService } from '../../../../core/api/services/AcademicTermsService';
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
  academicTerms: AcademicPeriodResponseDTO[] = [];
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
    this.loadAcademicTerms();
  }

  loadAcademicTerms(): void {
    this.loading = true;
    
    AcademicTermsService.getAllAcademicTerms().then((response: any) => {
      this.academicTerms = response.content || [];
      this.totalRecords = response.totalElements || 0;
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar períodos académicos');
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadAcademicTerms();
  }

  filterByStatus(): void {
    this.first = 0;
    this.loadAcademicTerms();
  }

  createNew(): void {
    this.router.navigate(['/academic-terms/new']);
  }

  edit(academicTerm: AcademicPeriodResponseDTO): void {
    this.router.navigate(['/academic-terms/edit', academicTerm.id]);
  }

  disable(academicTerm: AcademicPeriodResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de deshabilitar el período académico ${academicTerm.label}?`,
      header: 'Confirmar Deshabilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, deshabilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        AcademicTermsService.disableAcademicTerm(academicTerm.id!).then(() => {
          this.toastService.success('Período académico deshabilitado exitosamente');
          this.loadAcademicTerms();
        }).catch(() => {
          this.toastService.error('Error al deshabilitar período académico');
        });
      }
    });
  }

  enable(academicTerm: AcademicPeriodResponseDTO): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de habilitar el período académico ${academicTerm.label}?`,
      header: 'Confirmar Habilitación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, habilitar',
      rejectLabel: 'Cancelar',
      accept: () => {
        AcademicTermsService.enableAcademicTerm(academicTerm.id!).then(() => {
          this.toastService.success('Período académico habilitado exitosamente');
          this.loadAcademicTerms();
        }).catch(() => {
          this.toastService.error('Error al habilitar período académico');
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
