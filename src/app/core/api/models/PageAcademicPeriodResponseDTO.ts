/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcademicPeriodResponseDTO } from './AcademicPeriodResponseDTO';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
export type PageAcademicPeriodResponseDTO = {
    totalElements?: number;
    totalPages?: number;
    pageable?: PageableObject;
    numberOfElements?: number;
    size?: number;
    content?: Array<AcademicPeriodResponseDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
};

