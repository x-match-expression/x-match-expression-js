import {BaseMapper, Case} from "./base";

export class StringCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: string) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return typeof element === "string";
    }
}

export class EmptyStringCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: string) => R)) {
        super(mapper);
    }

    matches(element: any) {
        return typeof element === "string" && element.length === 0;
    }
}

export class StringLikeCase<R> implements Case<R> {

    constructor(readonly pattern: RegExp, readonly mapper: R | ((match: RegExpExecArray) => R)) {
    }

    matches(element: any) {
        return typeof element === "string" && this.pattern.exec(element) != null;
    }

    map(element: any): R {
        if (typeof this.mapper !== "function")
            return this.mapper;

        const match = this.pattern.exec(element);

        return (this.mapper as Function)(match);
    }
}