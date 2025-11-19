import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseResponseDTO } from '../../../../core/api/models/CourseResponseDTO';
import { CreateTaskRequestDTO } from '../../../../core/api/models/CreateTaskRequestDTO';
import { TaskResponseDTO } from '../../../../core/api/models/TaskResponseDTO';
import { UpdateTaskRequestDTO } from '../../../../core/api/models/UpdateTaskRequestDTO';
import { CoursesService } from '../../../../core/api/services/CoursesService';
import { TasksService } from '../../../../core/api/services/TasksService';
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
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId: string | null = null;
  loading: boolean = false;
  courseOptions: CourseOption[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      courseId: ['', Validators.required],
      academicTermYear: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      summary: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      dueDate: [null, Validators.required],
      maxAttempts: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      minScoreToPass: [7, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadCourses(): void {
    CoursesService.getAllCourses().then((response: any) => {
      const courses: CourseResponseDTO[] = response.content || [];
      this.courseOptions = courses.map(course => ({
        label: `${course.code} - ${course.name}`,
        value: course.id!
      }));
    }).catch(() => {
      this.toastService.error('Error al cargar cursos');
    });
  }

  loadTask(id: string): void {
    this.loading = true;
    
    TasksService.getTaskById(id).then((task: TaskResponseDTO) => {
      // En modo edición, solo actualizamos los campos permitidos
      this.taskForm.patchValue({
        title: task.title,
        summary: task.summary,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        maxAttempts: task.maxAttempts,
        minScoreToPass: task.minScoreToPass
      });
      
      // Deshabilitar campos que no se pueden editar
      this.taskForm.get('courseId')?.disable();
      this.taskForm.get('academicTermYear')?.disable();
      
      this.loading = false;
    }).catch(() => {
      this.toastService.error('Error al cargar tarea');
      this.loading = false;
      this.goBack();
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      this.toastService.warning('Por favor complete todos los campos requeridos');
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.taskId) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask(): void {
    const formValue = this.taskForm.getRawValue();
    
    const requestBody: CreateTaskRequestDTO = {
      courseId: formValue.courseId,
      academicTermYear: formValue.academicTermYear,
      title: formValue.title,
      summary: formValue.summary,
      dueDate: this.formatDate(formValue.dueDate),
      maxAttempts: formValue.maxAttempts,
      minScoreToPass: formValue.minScoreToPass
    };

    TasksService.createTask(requestBody).then(() => {
      this.toastService.success('Tarea creada exitosamente');
      this.goBack();
    }).catch(() => {
      this.toastService.error('Error al crear tarea');
      this.loading = false;
    });
  }

  updateTask(): void {
    const formValue = this.taskForm.getRawValue();
    
    const requestBody: UpdateTaskRequestDTO = {
      title: formValue.title,
      summary: formValue.summary,
      dueDate: this.formatDate(formValue.dueDate),
      maxAttempts: formValue.maxAttempts,
      minScoreToPass: formValue.minScoreToPass
    };

    TasksService.updateTask(this.taskId!, requestBody).then(() => {
      this.toastService.success('Tarea actualizada exitosamente');
      this.goBack();
    }).catch(() => {
      this.toastService.error('Error al actualizar tarea');
      this.loading = false;
    });
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
