import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateStudentRequestDTO } from '../../../../core/api/models/CreateStudentRequestDTO';
import { CoursesService } from '../../../../core/api/services/CoursesService';
import { StudentsService } from '../../../../core/api/services/StudentsService';
import { ToastService } from '../../../../shared/services/toast.service';

interface CourseOption {
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
  studentId: string | null = null;
  loading: boolean = false;
  submitting: boolean = false;
  
  courseOptions: CourseOption[] = [];
  loadingCourses: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCourses();
    this.checkEditMode();
  }

  initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/.*@udla\.edu\.ec$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      courseId: [null, Validators.required]
    });
  }

  loadCourses(): void {
    this.loadingCourses = true;
    CoursesService.getAllCourses().then((response: any) => {
      const courses = response.content || [];
      this.courseOptions = courses
        .filter((course: any) => course.status === 'ENABLED')
        .map((course: any) => ({
          label: `${course.code} - ${course.name}`,
          value: course.id
        }));
      this.loadingCourses = false;
    }).catch(() => {
      this.toastService.error('Error al cargar cursos');
      this.loadingCourses = false;
    });
  }

  checkEditMode(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.isEditMode = true;
      // En modo edición, password no es requerido
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.setValidators([Validators.minLength(8)]);
      this.form.get('password')?.updateValueAndValidity();
      this.loadStudent();
    }
  }

  loadStudent(): void {
    if (!this.studentId) return;

    this.loading = true;
    StudentsService.getStudentById(this.studentId).then((student: any) => {
      this.form.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        courseId: student.course?.id,
        password: '' // No cargamos la contraseña
      });
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar estudiante');
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
    
    const requestDTO: CreateStudentRequestDTO = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      courseId: formValue.courseId
    };

    if (this.isEditMode && this.studentId) {
      this.updateStudent(requestDTO);
    } else {
      this.createStudent(requestDTO);
    }
  }

  createStudent(requestDTO: CreateStudentRequestDTO): void {
    StudentsService.createStudent(requestDTO).then(() => {
      this.toastService.success('Estudiante creado exitosamente');
      this.submitting = false;
      this.router.navigate(['/students']);
    }).catch(() => {
      this.toastService.error('Error al crear estudiante');
      this.submitting = false;
    });
  }

  updateStudent(requestDTO: CreateStudentRequestDTO): void {
    // Nota: El servicio generado podría no tener updateStudent
    // En ese caso, solo creamos estudiantes nuevos
    this.toastService.warning('La actualización de estudiantes no está disponible en esta versión');
    this.submitting = false;
    this.router.navigate(['/students']);
  }

  cancel(): void {
    this.router.navigate(['/students']);
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
    if (field.hasError('email')) {
      return 'Email inválido';
    }
    if (field.hasError('pattern')) {
      return 'El email debe ser del dominio @udla.edu.ec';
    }
    return '';
  }
}
