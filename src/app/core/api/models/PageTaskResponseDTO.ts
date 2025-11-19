/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
import type { TaskResponseDTO } from './TaskResponseDTO';
export type PageTaskResponseDTO = {
    totalElements?: number;
    totalPages?: number;
    pageable?: PageableObject;
    numberOfElements?: number;
    size?: number;
    content?: Array<TaskResponseDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

