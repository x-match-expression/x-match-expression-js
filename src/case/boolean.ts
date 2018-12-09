import {BaseMapper, Case} from "./base";

export class BooleanCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return typeof element === "boolean";
    }
}

export class TrueCase<R> extends BooleanCase<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && element;
    }
}

export class FalseCase<R> extends BooleanCase<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && !element;
    }
}