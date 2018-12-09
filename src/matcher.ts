import {CustomCase} from "./case/custom";
import {BaseMapper, Case, Class, IfCase, Instance} from "./case/base";
import {InstanceCase, NotNullCase, NullCase, ObjectCase, ObjectLikeCase, ObjectWithKeysCase} from "./case/object";
import {BooleanCase, FalseCase, TrueCase} from "./case/boolean";
import {EqualCase, NotEqualCase} from "./case/equality";
import {
    NumberAlmostEqualCase,
    NumberCase,
    NumberGreaterCase,
    NumberGreaterEqualCase,
    NumberLessCase,
    NumberLessEqualCase
} from "./case/number";
import {EmptyStringCase, StringCase, StringLikeCase} from "./case/string";
import {
    DateCase,
    DateNewerEqualThanCase,
    DateNewerThanCase,
    DateOlderEqualThanCase,
    DateOlderThanCase
} from "./case/date";
import {ArrayCase, EmptyArrayCase} from "./case/array";

export class Matcher<R> {

    private readonly cases: Case<R>[] = [];

    constructor(private readonly element: any, startingPattern?: Case<R>) {

        if (startingPattern != null)
            this.cases.push(startingPattern);

    }

    case<E>(test: (element: any) => boolean, mapper: R | ((element: E) => (R))) {
        this.cases.push(new CustomCase(test, mapper));
        return this;
    }

    caseInstance<T extends Class | Function>(constructor: T, mapper: R | ((element: Instance<T>) => R)): Matcher<R> {
        this.cases.push(new InstanceCase(constructor, mapper));
        return this;
    }

    caseInstanceIf<T extends Class | Function>(type: T, test: (element: Instance<T>) => boolean, mapper: R | ((element: Instance<T>) => (R))): Matcher<R> {
        this.cases.push(new IfCase(new InstanceCase(type, mapper), test));
        return this;
    }

    caseTrue(mapper: R | (() => R)): Matcher<R> {
        this.cases.push(new TrueCase(mapper));
        return this;
    }

    caseTrueIf(test: () => boolean, mapper: R | (() => R)): Matcher<R> {
        this.cases.push(new IfCase(new TrueCase(mapper), test));
        return this;
    }

    caseFalse(mapper: R | (() => R)): Matcher<R> {
        this.cases.push(new FalseCase(mapper));
        return this;
    }

    caseFalseIf(test: () => boolean, mapper: R | (() => R)): Matcher<R> {
        this.cases.push(new IfCase(new FalseCase(mapper), test));
        return this;
    }

    caseBoolean(mapper: R | ((element: boolean) => R)): Matcher<R> {
        this.cases.push(new BooleanCase(mapper));
        return this;
    }

    caseBooleanIf(test: (element: boolean) => boolean, mapper: R | ((element: boolean) => R)): Matcher<R> {
        this.cases.push(new IfCase(new BooleanCase(mapper), test));
        return this;
    }

    caseEqual<E>(otherElement: E, mapper: R | ((element: E) => R)): Matcher<R> {
        this.cases.push(new EqualCase(otherElement, mapper));
        return this;
    }

    caseEqualIf<E>(otherElement: E, test: (element: E) => boolean, mapper: R | ((element: E) => R)): Matcher<R> {
        this.cases.push(new EqualCase(otherElement, mapper));
        return this;
    }

    caseNotEqual(otherElement: any, mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new NotEqualCase(otherElement, mapper));
        return this;
    }

    caseNotEqualIf(otherElement: any, test: (element: any) => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NotEqualCase(otherElement, mapper), test));
        return this;
    }

    caseNumber(mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new NumberCase(mapper));
        return this;
    }

    caseNumberIf(test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NumberCase(mapper), test));
        return this;
    }

    caseAlmostEqual(otherElement: number, mapper: R | ((element: number) => R), acceptedError?: number): Matcher<R> {
        this.cases.push(new NumberAlmostEqualCase(otherElement, mapper, acceptedError));
        return this;
    }

    caseAlmostEqualIf(otherElement: number, test: (element: number) => boolean, mapper: R | ((element: number) => R), acceptedError?: number): Matcher<R> {
        this.cases.push(new IfCase(new NumberAlmostEqualCase(otherElement, mapper, acceptedError), test));
        return this;
    }

    caseGreaterThan(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new NumberGreaterCase(otherElement, mapper));
        return this;
    }

    caseGreaterThanIf(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NumberGreaterCase(otherElement, mapper), test));
        return this;
    }

    caseGreaterEqualThan(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new NumberGreaterEqualCase(otherElement, mapper));
        return this;
    }

    caseGreaterEqualThanIf(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NumberGreaterEqualCase(otherElement, mapper), test));
        return this;
    }

    caseLessThan(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new NumberLessCase(otherElement, mapper));
        return this;
    }

    caseLessThanIf(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NumberLessCase(otherElement, mapper), test));
        return this;
    }

    caseLessEqualThan(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new NumberLessEqualCase(otherElement, mapper));
        return this;
    }

    caseLessEqualThanIf(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NumberLessEqualCase(otherElement, mapper), test));
        return this;
    }

    caseNull(mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new NullCase(mapper));
        return this;
    }

    caseNullIf(test: () => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NullCase(mapper), test));
        return this;
    }

    caseNotNull(mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new NotNullCase(mapper));
        return this;
    }

    caseNotNullIf(test: (element: any) => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        this.cases.push(new IfCase(new NotNullCase(mapper), test));
        return this;
    }

    caseObject(mapper: R | ((element: object) => R)): Matcher<R> {
        this.cases.push(new ObjectCase(mapper));
        return this;
    }

    caseObjectIf(test: (element: object) => boolean, mapper: R | ((element: object) => R)): Matcher<R> {
        this.cases.push(new IfCase(new ObjectCase(mapper), test));
        return this;
    }

    caseObjectLike<O extends object>(other: O, mapper: R | ((element: O) => R)): Matcher<R> {
        this.cases.push(new ObjectLikeCase(other, mapper));
        return this;
    }

    caseObjectLikeIf<O extends object>(other: O, test: (element: O) => boolean, mapper: R | ((element: O) => R)): Matcher<R> {
        this.cases.push(new IfCase(new ObjectLikeCase(other, mapper), test));
        return this;
    }

    // todo change maper element type with a type that contains the checked keys
    caseObjectWithKeys<K extends Array<string>>(keys: K, mapper: R | ((element: Record<number, keyof K>) => R)): Matcher<R> {
        this.cases.push(new ObjectWithKeysCase(keys, mapper));
        return this;
    }

    caseObjectWithKeysIf<K extends Array<string>>(keys: K, test: (element: object) => boolean, mapper: R | ((element: Record<number, keyof K>) => R)): Matcher<R> {
        this.cases.push(new IfCase(new ObjectWithKeysCase(keys, mapper), test));
        return this;
    }

    caseString(mapper: R | ((element: string) => R)): Matcher<R> {
        this.cases.push(new StringCase(mapper));
        return this;
    }

    caseStringIf(test: (element: string) => boolean, mapper: R | ((element: string) => R)): Matcher<R> {
        this.cases.push(new IfCase(new StringCase(mapper), test));
        return this;
    }

    caseStringLike(exp: RegExp, mapper: R | ((element: RegExpExecArray) => R)): Matcher<R> {
        this.cases.push(new StringLikeCase(exp, mapper));
        return this;
    }

    caseStringLikeIf(exp: RegExp, test: (element: string) => boolean, mapper: R | ((element: RegExpExecArray) => R)): Matcher<R> {
        this.cases.push(new IfCase(new StringLikeCase(exp, mapper), test));
        return this;
    }

    caseEmptyString(mapper: R | ((element: string) => R)): Matcher<R> {
        this.cases.push(new EmptyStringCase(mapper));
        return this;
    }

    caseEmptyStringIf(test: () => boolean, mapper: R | ((element: string) => R)): Matcher<R> {
        this.cases.push(new IfCase(new EmptyStringCase(mapper), test));
        return this;
    }

    caseDate(mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new DateCase(mapper));
        return this;
    }

    caseDateIf(test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new IfCase(new DateCase(mapper), test));
        return this;
    }

    caseOlderThan(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new DateOlderThanCase(other, mapper));
        return this;
    }

    caseOlderThanIf(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new IfCase(new DateOlderThanCase(other, mapper), test));
        return this;
    }

    caseOlderEqualThan(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new DateOlderEqualThanCase(other, mapper));
        return this;
    }

    caseOlderEqualThanIf(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new IfCase(new DateOlderEqualThanCase(other, mapper), test));
        return this;
    }

    caseNewerThan(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new DateNewerThanCase(other, mapper));
        return this;
    }

    caseNewerThanIf(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new IfCase(new DateNewerThanCase(other, mapper), test));
        return this;
    }

    caseNewerEqualThan(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new DateNewerEqualThanCase(other, mapper));
        return this;
    }

    caseNewerEqualThanIf(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        this.cases.push(new IfCase(new DateNewerEqualThanCase(other, mapper), test));
        return this;
    }

    caseArray(mapper: R | ((element: Array<any>) => R)): Matcher<R> {
        this.cases.push(new ArrayCase(mapper));
        return this;
    }

    caseArrayIf(test: (element: Array<any>) => boolean, mapper: R | ((element: Array<any>) => R)): Matcher<R> {
        this.cases.push(new IfCase(new ArrayCase(mapper), test));
        return this;
    }

    caseEmptyArray(mapper: R | ((element: Array<any>) => R)): Matcher<R> {
        this.cases.push(new EmptyArrayCase(mapper));
        return this;
    }

    caseEmptyArrayIf(test: (element: Array<any>) => boolean, mapper: R | ((element: Array<any>) => R)): Matcher<R> {
        this.cases.push(new IfCase(new EmptyArrayCase(mapper), test));
        return this;
    }

    default(mapper: R | ((element: any) => R)): R {

        for (let i = 0; i < this.cases.length; i++) {

            const pattern = this.cases[i];

            if (pattern.matches(this.element))
                return pattern.map(this.element);
        }

        return new BaseMapper<R>(mapper).map(this.element);
    }
}