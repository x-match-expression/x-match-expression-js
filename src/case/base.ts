export interface Case<R> {
    matches(element: any): boolean;

    map(element: any): R;
}

export class IfCase<R> implements Case<R> {
    constructor(readonly testCase: Case<R>, readonly additionalTest: (element: any) => boolean) {}

    map(element: any): R {
        return this.testCase.map(element);
    }

    matches(element: any): boolean {
        try {
            return this.testCase.matches(element) && this.additionalTest(element);
        } catch (e) {
            return false;
        }
    }
}

export class BaseMapper<R> {

    constructor(readonly mapper: any) {
    }

    map(element: any): R {
        return typeof this.mapper === "function" ?
            this.mapper(element) : this.mapper;
    }
}

export interface Class {
    new(...args: any[]): Class;
}

export type Instance<T> =
    T extends Class ? InstanceType<T> : any;