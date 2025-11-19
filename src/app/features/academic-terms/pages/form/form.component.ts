import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateAcademicPeriodRequestDTO } from '../../../../core/api/models/CreateAcademicPeriodRequestDTO';
import { AcademicTermsService } from '../../../../core/api/services/AcademicTermsService';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  academicTermId: string | null = null;
  loading: boolean = false;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]]
    });
  }

  checkEditMode(): void {
    this.academicTermId = this.route.snapshot.paramMap.get('id');
    if (this.academicTermId) {
      this.isEditMode = true;
      this.loadAcademicTerm();
    }
  }

  loadAcademicTerm(): void {
    if (!this.academicTermId) return;

    this.loading = true;
    AcademicTermsService.getAcademicTermById(this.academicTermId).then((term: any) => {
      this.form.patchValue({
        startDate: new Date(term.startOfTerm!),
        endDate: new Date(term.endOfTerm!),
        year: term.academicYear
      });
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar período académico');
      this.loading = false;
      this.cancel();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.warning('Por favor complete todos los campos requeridos');
      return;
    }

    this.submitting = true;
    const formValue = this.form.value;
    
    const requestDTO: CreateAcademicPeriodRequestDTO = {
      startDate: this.formatDate(formValue.startDate),
      endDate: this.formatDate(formValue.endDate),
      year: formValue.year
    };

    if (this.isEditMode && this.academicTermId) {
      this.updateAcademicTerm(requestDTO);
    } else {
      this.createAcademicTerm(requestDTO);
    }
  }

  createAcademicTerm(requestDTO: CreateAcademicPeriodRequestDTO): void {
    AcademicTermsService.createAcademicTerm(requestDTO).then(() => {
      this.toastService.success('Período académico creado exitosamente');
      this.submitting = false;
      this.router.navigate(['/academic-terms']);
    }).catch(() => {
      this.toastService.error('Error al crear período académico');
      this.submitting = false;
    });
  }

  updateAcademicTerm(requestDTO: CreateAcademicPeriodRequestDTO): void {
    AcademicTermsService.updateAcademicTerm(
      this.academicTermId!, 
      requestDTO as any
    ).then(() => {
      this.toastService.success('Período académico actualizado exitosamente');
      this.submitting = false;
      this.router.navigate(['/academic-terms']);
    }).catch(() => {
      this.toastService.error('Error al actualizar período académico');
      this.submitting = false;
    });
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cancel(): void {
    this.router.navigate(['/academic-terms']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field.hasError('min')) {
      return 'El año debe ser mayor a 2000';
    }
    if (field.hasError('max')) {
      return 'El año debe ser menor a 2100';
    }
    return '';
  }
}
