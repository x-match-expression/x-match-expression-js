import {BaseMapper, Case} from "./base";

export class NumberCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: number) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return typeof element === "number";
    }
}

export class NumberAlmostEqualCase<R> extends NumberCase<R> {

    constructor(readonly otherElement: number, readonly mapper: R | ((element: any) => R), readonly acceptedError: number = 0.00000000001) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(this.otherElement) && NumberAlmostEqualCase.almostEqual(element, this.otherElement, this.acceptedError);
    }

    static almostEqual(a: number, b: number, acceptedError: number): boolean {
        return Math.abs(a - b) < acceptedError;
    }
}

export class NumberGreaterCase<R> extends NumberCase<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && (element as number) > this.otherElement;
    }
}

export class NumberGreaterEqualCase<R> extends NumberCase<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && (element as number) >= this.otherElement;
    }
}

export class NumberLessCase<R> extends NumberCase<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && (element as number) < this.otherElement;
    }
}

export class NumberLessEqualCase<R> extends NumberCase<R> {

    constructor(readonly otherElement: any, readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return super.matches(element) && (element as number) <= this.otherElement;
    }
}