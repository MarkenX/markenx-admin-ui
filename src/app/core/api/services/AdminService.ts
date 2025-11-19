/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Debug authentication
     * Returns authentication details for debugging purposes. Shows principal, authorities, and other JWT token information.
     * @returns string Authentication details retrieved successfully
     * @throws ApiError
     */
    public static debugAuth(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/markenx/admin/debug/auth',
        });
    }
}
