/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignmentStatusResponseDTO } from '../models/AssignmentStatusResponseDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AssignmentsService {
    /**
     * Get assignment status catalog
     * Retrieves all possible assignment status values. This endpoint does not require authentication.
     * @returns AssignmentStatusResponseDTO Status list retrieved successfully
     * @throws ApiError
     */
    public static getAssignmentStatus(): CancelablePromise<AssignmentStatusResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/assignments/status',
        });
    }
}
