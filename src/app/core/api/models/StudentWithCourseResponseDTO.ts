/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseInfo } from './CourseInfo';
/**
 * Student profile with course information
 */
export type StudentWithCourseResponseDTO = {
    /**
     * Student unique identifier
     */
    id?: string;
    /**
     * Student code
     */
    code?: string;
    /**
     * Student first name
     */
    firstName?: string;
    /**
     * Student last name
     */
    lastName?: string;
    /**
     * Student email
     */
    email?: string;
    /**
     * Student status
     */
    status?: string;
    /**
     * Course information
     */
    course?: CourseInfo;
};

