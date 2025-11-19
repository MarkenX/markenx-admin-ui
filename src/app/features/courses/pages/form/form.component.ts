import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCourseRequestDTO } from '../../../../core/api/models/CreateCourseRequestDTO';
import { AcademicTermsService } from '../../../../core/api/services/AcademicTermsService';
import { CoursesService } from '../../../../core/api/services/CoursesService';
import { ToastService } from '../../../../shared/services/toast.service';

interface AcademicPeriodOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  courseId: string | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  
  academicPeriodOptions: AcademicPeriodOption[] = [];
  loadingPeriods: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAcademicPeriods();
    this.checkEditMode();
  }

  initForm(): void {
    this.form = this.fb.group({
      academicPeriodId: [null, Validators.required],
      label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });
  }

  loadAcademicPeriods(): void {
    this.loadingPeriods = true;
    AcademicTermsService.getAllAcademicTerms().then((response: any) => {
      const periods = response.content || [];
      this.academicPeriodOptions = periods.map((period: any) => ({
        label: period.label,
        value: period.id
      }));
      this.loadingPeriods = false;
    }).catch(() => {
      this.toastService.error('Error al cargar períodos académicos');
      this.loadingPeriods = false;
    });
  }

  checkEditMode(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse();
    }
  }

  loadCourse(): void {
    if (!this.courseId) return;

    this.loading = true;
    CoursesService.getCourseById(this.courseId).then((course: any) => {
      this.form.patchValue({
        academicPeriodId: course.academicPeriod?.id,
        label: course.name
      });
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar curso');
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
    
    const requestDTO: CreateCourseRequestDTO = {
      academicPeriodId: formValue.academicPeriodId,
      label: formValue.label
    };

    if (this.isEditMode && this.courseId) {
      this.updateCourse(requestDTO);
    } else {
      this.createCourse(requestDTO);
    }
  }

  createCourse(requestDTO: CreateCourseRequestDTO): void {
    CoursesService.createCourse(requestDTO).then(() => {
      this.toastService.success('Curso creado exitosamente');
      this.submitting = false;
      this.router.navigate(['/courses']);
    }).catch(() => {
      this.toastService.error('Error al crear curso');
      this.submitting = false;
    });
  }

  updateCourse(requestDTO: CreateCourseRequestDTO): void {
    CoursesService.updateCourse(
      this.courseId!, 
      requestDTO as any
    ).then(() => {
      this.toastService.success('Curso actualizado exitosamente');
      this.submitting = false;
      this.router.navigate(['/courses']);
    }).catch(() => {
      this.toastService.error('Error al actualizar curso');
      this.submitting = false;
    });
  }

  cancel(): void {
    this.router.navigate(['/courses']);
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
    if (field.hasError('minlength')) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (field.hasError('maxlength')) {
      return `Máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
