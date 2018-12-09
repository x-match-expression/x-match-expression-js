import {BaseMapper, Case} from "./base";

export class DateCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: any) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element instanceof Date;
    }
}

export class DateOlderThanCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly other: Date, readonly mapper: R | ((element: Date) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element instanceof Date && element.getTime() < this.other.getTime();
    }
}

export class DateOlderEqualThanCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly other: Date, readonly mapper: R | ((element: Date) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element instanceof Date && element.getTime() <= this.other.getTime();
    }
}

export class DateNewerThanCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly other: Date, readonly mapper: R | ((element: Date) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element instanceof Date && element.getTime() > this.other.getTime();
    }
}

export class DateNewerEqualThanCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly other: Date, readonly mapper: R | ((element: Date) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return element instanceof Date && element.getTime() >= this.other.getTime();
    }
}