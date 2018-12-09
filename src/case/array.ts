import {BaseMapper, Case} from "./base";

export class ArrayCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: Array<any>) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return element instanceof Array;
    }
}

export class EmptyArrayCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: Array<any>) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return element instanceof Array && element.length === 0;
    }
}
