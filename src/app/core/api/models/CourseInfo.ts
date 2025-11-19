/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcademicTermInfo } from './AcademicTermInfo';
/**
 * Course basic information
 */
export type CourseInfo = {
    /**
     * Course unique identifier
     */
    id?: string;
    /**
     * Course code
     */
    code?: string;
    /**
     * Course name
     */
    name?: string;
    /**
     * Course status
     */
    status?: string;
    /**
     * Academic term information
     */
    academicTerm?: AcademicTermInfo;
};

