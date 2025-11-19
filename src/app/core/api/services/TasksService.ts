/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequestDTO } from '../models/CreateTaskRequestDTO';
import type { PageTaskResponseDTO } from '../models/PageTaskResponseDTO';
import type { TaskResponseDTO } from '../models/TaskResponseDTO';
import type { UpdateTaskRequestDTO } from '../models/UpdateTaskRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Get task by ID
     * Retrieves a specific task by its unique identifier. Admins can see disabled tasks.
     * @param id Task ID (UUID)
     * @returns TaskResponseDTO Task found
     * @throws ApiError
     */
    public static getTaskById(
        id: string,
    ): CancelablePromise<TaskResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Task not found`,
            },
        });
    }
    /**
     * Update a task
     * Updates an existing task. Requires ADMIN role. Note: courseId and academicTermYear cannot be changed after creation.
     * @param id Task ID (UUID)
     * @param requestBody
     * @returns TaskResponseDTO Task updated successfully
     * @throws ApiError
     */
    public static updateTask(
        id: string,
        requestBody: UpdateTaskRequestDTO,
    ): CancelablePromise<TaskResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid data or validation errors`,
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Task not found`,
            },
        });
    }
    /**
     * Enable a task
     * Enables a previously disabled task by setting status to ENABLED. Requires ADMIN role.
     * @param id Task ID (UUID)
     * @returns void
     * @throws ApiError
     */
    public static enableTask(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/tasks/{id}/enable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Task not found`,
            },
        });
    }
    /**
     * Disable a task
     * Disables a task by setting status to DISABLED. Requires ADMIN role. Task can only be disabled if it has no student assignments (StudentTask dependencies).
     * @param id Task ID (UUID)
     * @returns void
     * @throws ApiError
     */
    public static disableTask(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/tasks/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                400: `Cannot disable task with dependencies`,
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
                404: `Task not found`,
            },
        });
    }
    /**
     * Get all tasks
     * Retrieves a paginated list of all tasks. Admins can see disabled tasks. Valid sort properties: id, code, title, dueDate, maxAttempts, minScoreToPass, createdAt, updatedAt. Example: ?page=0&size=10&sort=dueDate,asc&sort=title,asc
     * @returns PageTaskResponseDTO Tasks retrieved successfully
     * @throws ApiError
     */
    public static getAllTasks(): CancelablePromise<PageTaskResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/tasks',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Create a new task
     * Creates a new task for a course without student assignments. Requires ADMIN role. The task will be created as a general assignment that can later be assigned to students.
     * @param requestBody
     * @returns TaskResponseDTO Task created successfully
     * @throws ApiError
     */
    public static createTask(
        requestBody: CreateTaskRequestDTO,
    ): CancelablePromise<TaskResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/markenx/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid data or validation errors`,
                401: `Unauthorized`,
                403: `Forbidden - Requires ADMIN role`,
            },
        });
    }
}
