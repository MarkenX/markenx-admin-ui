/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AttemptResponseDTO = {
    id?: string;
    code?: string;
    score?: number;
    submittedAt?: string;
    timeSpent?: {
        seconds?: number;
        zero?: boolean;
        nano?: number;
        negative?: boolean;
        units?: Array<{
            durationEstimated?: boolean;
            timeBased?: boolean;
            dateBased?: boolean;
        }>;
    };
    status?: AttemptResponseDTO.status;
    result?: AttemptResponseDTO.result;
};
export namespace AttemptResponseDTO {
    export enum status {
        COMPLETED = 'COMPLETED',
        INTERRUPTED = 'INTERRUPTED',
    }
    export enum result {
        APPROVED = 'APPROVED',
        DISAPPROVED = 'DISAPPROVED',
        UNKNOWN = 'UNKNOWN',
    }
}

