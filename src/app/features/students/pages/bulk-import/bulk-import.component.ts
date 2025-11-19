import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenAPI } from '../../../../core/api/core/OpenAPI';
import { CoursesService } from '../../../../core/api/services/CoursesService';
import { StudentsService } from '../../../../core/api/services/StudentsService';
import { ToastService } from '../../../../shared/services/toast.service';

interface CourseOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.css']
})
export class BulkImportComponent implements OnInit {
  selectedCourseId: string | null = null;
  courseOptions: CourseOption[] = [];
  loadingCourses: boolean = false;
  
  selectedFile: File | null = null;
  uploading: boolean = false;

  constructor(
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loadingCourses = true;
    CoursesService.getAllCourses().then((response: any) => {
      const courses = response.content || [];
      this.courseOptions = courses.map((course: any) => ({
        label: `${course.code} - ${course.name}`,
        value: course.id
      }));
      this.loadingCourses = false;
    }).catch(() => {
      this.toastService.error('Error al cargar cursos');
      this.loadingCourses = false;
    });
  }

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        this.toastService.error('Solo se permiten archivos CSV');
        return;
      }
      this.selectedFile = file;
    }
  }

  uploadStudents(): void {
    if (!this.selectedCourseId) {
      this.toastService.warning('Por favor seleccione un curso');
      return;
    }

    if (!this.selectedFile) {
      this.toastService.warning('Por favor seleccione un archivo CSV');
      return;
    }

    this.uploading = true;
    
    StudentsService.bulkImportStudents(this.selectedCourseId, {
      file: this.selectedFile
    }).then((response: any) => {
      this.toastService.success(`${response.successCount} estudiantes importados exitosamente`);
      if (response.failureCount > 0) {
        this.toastService.warning(`${response.failureCount} estudiantes fallaron`);
      }
      this.uploading = false;
      this.selectedFile = null;
      this.router.navigate(['/students']);
    }).catch(() => {
      this.toastService.error('Error al importar estudiantes');
      this.uploading = false;
    });
  }

  downloadTemplate(): void {
    const templateUrl = `${OpenAPI.BASE}/api/markenx/students/bulk-import/template`;
    window.open(templateUrl, '_blank');
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
