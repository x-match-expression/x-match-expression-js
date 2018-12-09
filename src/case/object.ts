import {BaseMapper, Case, Class, Instance} from "./base";

export class InstanceCase<T extends Class | Function, R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly constructor: T, readonly mapper: R | ((element: Instance<T>) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return element instanceof this.constructor;
    }
}

export class ObjectCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: object) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return typeof element === "object";
    }
}

export class ObjectLikeCase<R, X> extends BaseMapper<R> implements Case<R> {

    constructor(readonly other: X, readonly mapper: R | ((element: X) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return typeof element === "object" && ObjectLikeCase.isLike(element, this.other)
    }

    static isLike(element: any, other: any): boolean {
        const otherKeys = Object.keys(other);
        for (let i = 0; i < otherKeys.length; i++) {
            const key = otherKeys[i];
            if (element[key] !== other[key])
                return false;
        }
        return true;
    }
}

export class ObjectWithKeysCase<R, K extends Array<string>> extends BaseMapper<R> implements Case<R> {

    constructor(readonly keys: K, readonly mapper: R | ((element: Record<number, keyof K>) => R)) {
        super(mapper);
    }

    matches(element: any): boolean {
        return typeof element === "object" && ObjectWithKeysCase.contains(element, this.keys)
    }

    static contains(element: any, keys: string[]): boolean {
        return keys.every(key => element[key] !== undefined)
    }
}

export class NullCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: object) => R)) {
        super(mapper);
    }

    // null or undefined are both matched
    matches(element: any): boolean {
        return element == null;
    }
}

export class NotNullCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly mapper: R | ((element: object) => R)) {
        super(mapper);
    }

    // means != null or undefined
    matches(element: any): boolean {
        return element != null;
    }
}