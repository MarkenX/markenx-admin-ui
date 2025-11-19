/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Task information
 */
export type TaskInfo = {
    /**
     * Task unique identifier
     */
    id?: string;
    /**
     * Task code
     */
    code?: string;
    /**
     * Task name
     */
    name?: string;
    /**
     * Task description
     */
    description?: string;
    /**
     * Maximum score for the task
     */
    maxScore?: number;
    /**
     * Minimum score to pass the task
     */
    minScoreToPass?: number;
    /**
     * Maximum number of attempts allowed
     */
    maxAttempts?: number;
    /**
     * Task status
     */
    status?: string;
    /**
     * Task start date
     */
    startDate?: string;
    /**
     * Task end date
     */
    endDate?: string;
    /**
     * Course code
     */
    courseCode?: string;
    /**
     * Course name
     */
    courseName?: string;
    /**
     * Academic term year
     */
    academicTermYear?: number;
};

