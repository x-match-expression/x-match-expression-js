import {BaseMapper, Case} from "./base";

export class CustomCase<R> extends BaseMapper<R> implements Case<R> {

    constructor(readonly test: (element: any) => boolean, readonly mapper: R | ((element: any) => R)) {
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