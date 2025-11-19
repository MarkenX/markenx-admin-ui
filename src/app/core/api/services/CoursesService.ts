/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseResponseDTO } from '../models/CourseResponseDTO';
import type { CreateCourseRequestDTO } from '../models/CreateCourseRequestDTO';
import type { PageCourseResponseDTO } from '../models/PageCourseResponseDTO';
import type { UpdateCourseRequestDTO } from '../models/UpdateCourseRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CoursesService {
    /**
     * Get course by ID
     * Retrieves a specific course by its unique identifier.
     * @param id Course ID
     * @returns CourseResponseDTO Course found
     * @throws ApiError
     */
    public static getCourseById(
        id: string,
    ): CancelablePromise<CourseResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/courses/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Course not found`,
            },
        });
    }
    /**
     * Update a course
     * Updates an existing course. Requires ADMIN role.
     * @param id Course ID
     * @param requestBody
     * @returns CourseResponseDTO Course updated successfully
     * @throws ApiError
     */
    public static updateCourse(
        id: string,
        requestBody: UpdateCourseRequestDTO,
    ): CancelablePromise<CourseResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/courses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Course not found`,
            },
        });
    }
    /**
     * Enable a course
     * Enables a previously disabled course by setting status to ENABLED. Requires ADMIN role.
     * @param id Course ID
     * @returns void
     * @throws ApiError
     */
    public static enableCourse(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/courses/{id}/enable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Course not found`,
            },
        });
    }
    /**
     * Disable a course
     * Disables a course by setting status to DISABLED. Requires ADMIN role. Course can only be disabled if it has no enabled tasks.
     * @param id Course ID
     * @returns void
     * @throws ApiError
     */
    public static disableCourse(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/courses/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                400: `Cannot disable course with enabled tasks`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Course not found`,
            },
        });
    }
    /**
     * Get all courses
     * Retrieves a paginated list of all courses. Valid sort properties: id, status, createdAt, updatedAt, name, credits, academicTermId. Example: ?page=0&size=10&sort=name,asc
     * @returns PageCourseResponseDTO Courses retrieved successfully
     * @throws ApiError
     */
    public static getAllCourses(): CancelablePromise<PageCourseResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/courses',
        });
    }
    /**
     * Create a new course
     * Creates a new course. Requires ADMIN role.
     * @param requestBody
     * @returns CourseResponseDTO Course created successfully
     * @throws ApiError
     */
    public static createCourse(
        requestBody: CreateCourseRequestDTO,
    ): CancelablePromise<CourseResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/markenx/courses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
}
