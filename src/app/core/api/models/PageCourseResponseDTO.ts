/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseResponseDTO } from './CourseResponseDTO';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
export type PageCourseResponseDTO = {
    totalElements?: number;
    totalPages?: number;
    pageable?: PageableObject;
    numberOfElements?: number;
    size?: number;
    content?: Array<CourseResponseDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

