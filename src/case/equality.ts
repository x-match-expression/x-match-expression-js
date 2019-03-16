import {BaseMapper, Case} from "./base";

export class EqualCase<E, R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly otherElement: E, readonly mapper: R | ((element: E) => R)) {
        super(mapper);
    }

    matches(element: E) {
        return element === this.otherElement;
    }
}

export class NotEqualCase<E, R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly otherElement: E, readonly mapper: R | ((element: E) => R)) {
        super(mapper);
    }

    matches(element: E) {
        return element !== this.otherElement;
    }
}

