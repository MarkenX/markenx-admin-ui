/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttemptResponseDTO } from '../models/AttemptResponseDTO';
import type { BulkImportResponseDTO } from '../models/BulkImportResponseDTO';
import type { CreateStudentRequestDTO } from '../models/CreateStudentRequestDTO';
import type { PageStudentResponseDTO } from '../models/PageStudentResponseDTO';
import type { StudentResponseDTO } from '../models/StudentResponseDTO';
import type { StudentTaskWithDetailsResponseDTO } from '../models/StudentTaskWithDetailsResponseDTO';
import type { StudentWithCourseResponseDTO } from '../models/StudentWithCourseResponseDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudentsService {
    /**
     * Enable a student
     * Enables a previously disabled student by setting status to ENABLED. Also enables the user in Keycloak. Requires ADMIN role.
     * @param id Student ID
     * @returns void
     * @throws ApiError
     */
    public static enableStudent(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/students/{id}/enable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Student not found`,
            },
        });
    }
    /**
     * Disable a student
     * Disables a student by setting status to DISABLED. Student record remains in database but is not visible to non-admins. Also disables the user in Keycloak. Requires ADMIN role.
     * @param id Student ID
     * @returns void
     * @throws ApiError
     */
    public static disableStudent(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/students/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Student not found`,
            },
        });
    }
    /**
     * Get all students
     * Retrieves a paginated list of students. Admins see all students including disabled ones. Valid sort properties: id, status, createdAt, updatedAt, firstName, lastName, email, identityNumber, studentCode. Example: ?page=0&size=10&sort=lastName,asc&sort=firstName,asc
     * @returns PageStudentResponseDTO Students retrieved successfully
     * @throws ApiError
     */
    public static getAllStudents(): CancelablePromise<PageStudentResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Create a new student
     * Creates a single student and registers them in Keycloak. Email must belong to @udla.edu.ec domain. Requires ADMIN role.
     * @param requestBody Student data
     * @returns StudentResponseDTO Student created successfully
     * @throws ApiError
     */
    public static createStudent(
        requestBody: CreateStudentRequestDTO,
    ): CancelablePromise<StudentResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/markenx/students',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid data or validation errors`,
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                409: `Student already exists`,
            },
        });
    }
    /**
     * Bulk import students from CSV
     * Imports multiple students from a CSV file to a specific course. CSV must have header: firstName,lastName,email. All emails must belong to @udla.edu.ec domain. Import is transactional (all-or-nothing). Requires ADMIN role.
     * @param courseId Course UUID
     * @param formData
     * @returns BulkImportResponseDTO Students imported successfully
     * @throws ApiError
     */
    public static bulkImportStudents(
        courseId: string,
        formData?: {
            /**
             * CSV file with student data
             */
            file: Blob;
        },
    ): CancelablePromise<BulkImportResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/markenx/students/course/{courseId}/bulk-import',
            path: {
                'courseId': courseId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid CSV format or validation errors`,
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Course not found`,
            },
        });
    }
    /**
     * Get student by ID
     * Retrieves a specific student by their unique identifier. Admins can see disabled students.
     * @param id Student ID
     * @returns StudentResponseDTO Student found
     * @throws ApiError
     */
    public static getStudentById(
        id: string,
    ): CancelablePromise<StudentResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Student not found`,
            },
        });
    }
    /**
     * Get current student profile
     * Retrieves the complete profile of the authenticated student including their enrolled course and academic term information. Only accessible by STUDENT role.
     * @returns StudentWithCourseResponseDTO Student profile retrieved successfully
     * @throws ApiError
     */
    public static getCurrentStudentProfile(): CancelablePromise<StudentWithCourseResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students/me',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires STUDENT role`,
                404: `Student not found`,
            },
        });
    }
    /**
     * Get current student's tasks
     * Retrieves all tasks assigned to the authenticated student with complete task details. Only accessible by STUDENT role.
     * @returns StudentTaskWithDetailsResponseDTO Student tasks retrieved successfully
     * @throws ApiError
     */
    public static getCurrentStudentTasks(): CancelablePromise<Array<StudentTaskWithDetailsResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students/me/tasks',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires STUDENT role`,
                404: `Student not found`,
            },
        });
    }
    /**
     * Get attempts for a specific task
     * Retrieves all attempts made by the authenticated student for a specific task. Only accessible by STUDENT role.
     * @param taskId Task ID
     * @returns AttemptResponseDTO Task attempts retrieved successfully
     * @throws ApiError
     */
    public static getCurrentStudentTaskAttempts(
        taskId: string,
    ): CancelablePromise<Array<AttemptResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students/me/tasks/{taskId}/attempts',
            path: {
                'taskId': taskId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires STUDENT role`,
                404: `Student or task not found`,
            },
        });
    }
    /**
     * Download CSV template
     * Downloads a CSV template file for bulk student import. Template includes header row with required columns.
     * @returns string Template downloaded successfully
     * @throws ApiError
     */
    public static downloadBulkImportTemplate(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/students/bulk-import/template',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
            },
        });
    }
}
