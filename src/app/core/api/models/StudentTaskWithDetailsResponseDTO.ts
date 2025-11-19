/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskInfo } from './TaskInfo';
/**
 * Student task with complete details including task and student task information
 */
export type StudentTaskWithDetailsResponseDTO = {
    /**
     * Student task unique identifier
     */
    studentTaskId?: string;
    /**
     * Student task code
     */
    studentTaskCode?: string;
    /**
     * Student task status
     */
    studentTaskStatus?: string;
    /**
     * Number of attempts made by the student
     */
    attemptCount?: number;
    /**
     * Task information
     */
    task?: TaskInfo;
};

