/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
import type { StudentResponseDTO } from './StudentResponseDTO';
export type PageStudentResponseDTO = {
    totalElements?: number;
    totalPages?: number;
    pageable?: PageableObject;
    numberOfElements?: number;
    size?: number;
    content?: Array<StudentResponseDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

