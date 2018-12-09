import {BaseMapper, Case} from "./base";

export class EqualCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element === this.otherElement;
    }
}

export class NotEqualCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element !== this.otherElement;
    }
}

