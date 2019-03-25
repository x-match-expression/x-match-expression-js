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

export class Matcher<E, R> {

    constructor(
        private readonly element: E,
        private readonly cases: Case<R>[]
    ) {
    }

    case<R2>(test: (element: E) => boolean, mapper: R2 | ((element: E) => (R2))) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new CustomCase(test, mapper)]);
    }

    caseInstance<T extends Class | Function, R2>(constructor: T, mapper: R2 | ((element: Instance<T>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new InstanceCase(constructor, mapper)]);
    }

    caseInstanceIf<T extends Class | Function, R2>(type: T, test: (element: Instance<T>) => boolean, mapper: R2 | ((element: Instance<T>) => (R2))) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new InstanceCase(type, mapper), test)]);
    }

    caseTrue<R2>(mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new TrueCase(mapper)]);
    }

    caseTrueIf<R2>(test: () => boolean, mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new TrueCase(mapper), test)]);
    }

    caseFalse<R2>(mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new FalseCase(mapper)]);
    }

    caseFalseIf<R2>(test: () => boolean, mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new FalseCase(mapper), test)]);
    }

    caseBoolean<R2>(mapper: R2 | ((element: boolean) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new BooleanCase(mapper)]);
    }

    caseBooleanIf<R2>(test: (element: boolean) => boolean, mapper: R2 | ((element: boolean) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new BooleanCase(mapper), test)]);
    }

    caseEqual<R2>(otherElement: E, mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new EqualCase(otherElement, mapper)]);
    }

    caseEqualIf<R2>(otherElement: E, test: (element: E) => boolean, mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new EqualCase(otherElement, mapper)]);
    }

    caseNotEqual<R2>(otherElement: E, mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NotEqualCase(otherElement, mapper)]);
    }

    caseNotEqualIf<R2>(otherElement: E, test: (element: E) => boolean, mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NotEqualCase(otherElement, mapper), test)]);
    }

    caseNumber<R2>(mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberCase(mapper)]);
    }

    caseNumberIf<R2>(test: (element: number) => boolean, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberCase(mapper), test)]);
    }

    caseAlmostEqual<R2>(otherElement: number, mapper: R2 | ((element: number) => R2), acceptedError?: number) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberAlmostEqualCase(otherElement, mapper, acceptedError)]);
    }

    caseAlmostEqualIf<R2>(otherElement: number, test: (element: number) => boolean, mapper: R2 | ((element: number) => R2), acceptedError?: number) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberAlmostEqualCase(otherElement, mapper, acceptedError), test)]);
    }

    caseGreaterThan<R2>(otherElement: number, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberGreaterCase(otherElement, mapper)]);
    }

    caseGreaterThanIf<R2>(otherElement: number, test: (element: number) => boolean, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberGreaterCase(otherElement, mapper), test)]);
    }

    caseGreaterEqualThan<R2>(otherElement: number, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberGreaterEqualCase(otherElement, mapper)]);
    }

    caseGreaterEqualThanIf<R2>(otherElement: number, test: (element: number) => boolean, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberGreaterEqualCase(otherElement, mapper), test)]);
    }

    caseLessThan<R2>(otherElement: number, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberLessCase(otherElement, mapper)]);
    }

    caseLessThanIf<R2>(otherElement: number, test: (element: number) => boolean, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberLessCase(otherElement, mapper), test)]);
    }

    caseLessEqualThan<R2>(otherElement: number, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NumberLessEqualCase(otherElement, mapper)]);
    }

    caseLessEqualThanIf<R2>(otherElement: number, test: (element: number) => boolean, mapper: R2 | ((element: number) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NumberLessEqualCase(otherElement, mapper), test)]);
    }

    caseNull<R2>(mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NullCase(mapper)]);
    }

    caseNullIf<R2>(test: () => boolean, mapper: R2 | (() => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NullCase(mapper), test)]);
    }

    caseNotNull<R2>(mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new NotNullCase(mapper)]);
    }

    caseNotNullIf<R2>(test: (element: E) => boolean, mapper: R2 | ((element: E) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new NotNullCase(mapper), test)]);
    }

    caseObject<R2>(mapper: R2 | ((element: object) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new ObjectCase(mapper)]);
    }

    caseObjectIf<R2>(test: (element: object) => boolean, mapper: R2 | ((element: object) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new ObjectCase(mapper), test)]);
    }

    caseObjectLike<O extends object, R2>(other: O, mapper: R2 | ((element: O) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new ObjectLikeCase(other, mapper)]);
    }

    caseObjectLikeIf<O extends object, R2>(other: O, test: (element: O) => boolean, mapper: R2 | ((element: O) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new ObjectLikeCase(other, mapper), test)]);
    }

    // todo change maper element type with a type that contains the checked keys
    caseObjectWithKeys<K extends Array<string>, R2>(keys: K, mapper: R2 | ((element: Record<number, keyof K>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new ObjectWithKeysCase(keys, mapper)]);
    }

    caseObjectWithKeysIf<K extends Array<string>, R2>(keys: K, test: (element: object) => boolean, mapper: R2 | ((element: Record<number, keyof K>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new ObjectWithKeysCase(keys, mapper), test)]);
    }

    caseString<R2>(mapper: R2 | ((element: string) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new StringCase(mapper)]);
    }

    caseStringIf<R2>(test: (element: string) => boolean, mapper: R2 | ((element: string) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new StringCase(mapper), test)]);
    }

    caseStringLike<R2>(exp: RegExp, mapper: R2 | ((element: RegExpExecArray) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new StringLikeCase(exp, mapper)]);
    }

    caseStringLikeIf<R2>(exp: RegExp, test: (element: string) => boolean, mapper: R2 | ((element: RegExpExecArray) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new StringLikeCase(exp, mapper), test)]);
    }

    caseEmptyString<R2>(mapper: R2 | ((element: string) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new EmptyStringCase(mapper)]);
    }

    caseEmptyStringIf<R2>(test: () => boolean, mapper: R2 | ((element: string) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new EmptyStringCase(mapper), test)]);
    }

    caseDate<R2>(mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new DateCase(mapper)]);
    }

    caseDateIf<R2>(test: (element: Date) => boolean, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new DateCase(mapper), test)]);
    }

    caseOlderThan<R2>(other: Date, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new DateOlderThanCase(other, mapper)]);
    }

    caseOlderThanIf<R2>(other: Date, test: (element: Date) => boolean, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new DateOlderThanCase(other, mapper), test)]);
    }

    caseOlderEqualThan<R2>(other: Date, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new DateOlderEqualThanCase(other, mapper)]);
    }

    caseOlderEqualThanIf<R2>(other: Date, test: (element: Date) => boolean, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new DateOlderEqualThanCase(other, mapper), test)]);
    }

    caseNewerThan<R2>(other: Date, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new DateNewerThanCase(other, mapper)]);
    }

    caseNewerThanIf<R2>(other: Date, test: (element: Date) => boolean, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new DateNewerThanCase(other, mapper), test)]);
    }

    caseNewerEqualThan<R2>(other: Date, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new DateNewerEqualThanCase(other, mapper)]);
    }

    caseNewerEqualThanIf<R2>(other: Date, test: (element: Date) => boolean, mapper: R2 | ((element: Date) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new DateNewerEqualThanCase(other, mapper), test)]);
    }

    caseArray<R2>(mapper: R2 | ((element: Array<any>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new ArrayCase(mapper)]);
    }

    caseArrayIf<R2>(test: (element: Array<any>) => boolean, mapper: R2 | ((element: Array<any>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new ArrayCase(mapper), test)]);
    }

    caseEmptyArray<R2>(mapper: R2 | ((element: Array<any>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new EmptyArrayCase(mapper)]);
    }

    caseEmptyArrayIf<R2>(test: (element: Array<any>) => boolean, mapper: R2 | ((element: Array<any>) => R2)) {
        return new Matcher<E, R | R2>(this.element, [...this.cases, new IfCase(new EmptyArrayCase(mapper), test)]);
    }

    default<R2>(mapper: R2 | ((element: any) => R2)): R | R2 {

        for (let i = 0; i < this.cases.length; i++) {

            const pattern = this.cases[i];

            if (pattern.matches(this.element))
                return pattern.map(this.element);
        }

        return new BaseMapper<R>(mapper).map(this.element);
    }
}