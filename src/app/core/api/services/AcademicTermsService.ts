/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcademicPeriodResponseDTO } from '../models/AcademicPeriodResponseDTO';
import type { CreateAcademicPeriodRequestDTO } from '../models/CreateAcademicPeriodRequestDTO';
import type { PageAcademicPeriodResponseDTO } from '../models/PageAcademicPeriodResponseDTO';
import type { UpdateAcademicTermRequestDTO } from '../models/UpdateAcademicTermRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AcademicTermsService {
    /**
     * Get academic term by ID
     * Retrieves a specific academic term by its unique identifier.
     * @param id Academic term ID
     * @returns AcademicPeriodResponseDTO Academic term found
     * @throws ApiError
     */
    public static getAcademicTermById(
        id: string,
    ): CancelablePromise<AcademicPeriodResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/academic-terms/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Academic term not found`,
            },
        });
    }
    /**
     * Update an academic term
     * Updates an existing academic period/term. Requires ADMIN role.
     * @param id Academic term ID
     * @param requestBody
     * @returns AcademicPeriodResponseDTO Academic term updated successfully
     * @throws ApiError
     */
    public static updateAcademicTerm(
        id: string,
        requestBody: UpdateAcademicTermRequestDTO,
    ): CancelablePromise<AcademicPeriodResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/academic-terms/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Academic term not found`,
            },
        });
    }
    /**
     * Enable an academic term
     * Enables a previously disabled academic term by setting status to ENABLED. Requires ADMIN role.
     * @param id Academic term ID
     * @returns void
     * @throws ApiError
     */
    public static enableAcademicTerm(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/academic-terms/{id}/enable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Academic term not found`,
            },
        });
    }
    /**
     * Disable an academic term
     * Disables an academic term by setting status to DISABLED. Requires ADMIN role. Term can only be disabled if it has no enabled courses.
     * @param id Academic term ID
     * @returns void
     * @throws ApiError
     */
    public static disableAcademicTerm(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/markenx/academic-terms/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                400: `Cannot disable term with enabled courses`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Academic term not found`,
            },
        });
    }
    /**
     * Get all academic terms
     * @returns PageAcademicPeriodResponseDTO Academic terms retrieved successfully
     * @throws ApiError
     */
    public static getAllAcademicTerms(): CancelablePromise<PageAcademicPeriodResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/academic-terms',
        });
    }
    /**
     * Create a new academic term
     * Creates a new academic period/term. Requires ADMIN role.
     * @param requestBody
     * @returns AcademicPeriodResponseDTO Academic term created successfully
     * @throws ApiError
     */
    public static createAcademicTerm(
        requestBody: CreateAcademicPeriodRequestDTO,
    ): CancelablePromise<AcademicPeriodResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/markenx/academic-terms',
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
