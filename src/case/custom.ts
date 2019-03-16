import {BaseMapper, Case} from "./base";

export class CustomCase<E, R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly test: (element: E) => boolean, readonly mapper: R | ((element: E) => R)) {
        super(mapper);
    }

    matches(element: any) {
        try {
            return this.test(element);
        } catch (e) {
            return false;
        }
    }
}