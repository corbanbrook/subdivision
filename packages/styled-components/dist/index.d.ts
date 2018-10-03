import { StyledComponentClass } from 'styled-components';
interface SubdivisionOptions {
    gutter?: number;
    gutterH: number;
    gutterV: number;
    containerSelector: string;
    columnSelector: string;
}
export default class Subdivision {
    gutterH: number;
    gutterV: number;
    containerSelector: string;
    columnSelector: string;
    Grid: StyledComponentClass<any, any, any>;
    readonly gutter: number;
    constructor(options?: Partial<SubdivisionOptions>);
    column: (fraction?: number, offset?: number, gutterLeft?: number, gutterRight?: number, center?: boolean) => string;
    offset: (offset?: number, gutter?: number) => string;
    stack: () => string;
    fullBleed: () => string;
    center: (fraction: number) => string;
    uncenter: () => string;
    rows: () => string;
    columns: () => string;
    private getOffset;
}
export {};
