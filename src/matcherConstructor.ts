import {CustomCase} from "./case/custom";
import {Class, IfCase, Instance} from "./case/base";
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
import {Matcher} from "./matcher";
import {ArrayCase, EmptyArrayCase} from "./case/array";

export class MatcherConstructor {

    constructor(private readonly element: any) {
    }

    withReturnType<R>() {
        return new Matcher<R>(this.element);
    }

    case<R, E>(test: (element: any) => boolean, mapper: R | ((element: E) => (R))) {
        return new Matcher(this.element, new CustomCase(test, mapper));
    }

    caseInstance<R, T extends Class | Function>(pattern: T, mapper: R | ((element: Instance<T>) => R)): Matcher<R> {
        return new Matcher(this.element, new InstanceCase(pattern, mapper));
    }

    caseInstanceIf<R, T extends Class | Function>(type: T, test: (element: Instance<T>) => boolean, mapper: R | ((element: Instance<T>) => (R))): Matcher<R> {
        return new Matcher(this.element, new IfCase(new InstanceCase(type, mapper), test));
    }

    caseTrue<R>(mapper: R | (() => R)): Matcher<R> {
        return new Matcher(this.element, new TrueCase(mapper));
    }

    caseTrueIf<R>(test: () => boolean, mapper: R | (() => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new TrueCase(mapper), test));
    }

    caseFalse<R>(mapper: R | (() => R)): Matcher<R> {
        return new Matcher(this.element, new FalseCase(mapper));
    }

    caseFalseIf<R>(test: () => boolean, mapper: R | (() => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new FalseCase(mapper), test));
    }

    caseBoolean<R>(mapper: R | ((element: boolean) => R)): Matcher<R> {
        return new Matcher(this.element, new BooleanCase(mapper));
    }

    caseBooleanIf<R>(test: (element: boolean) => boolean, mapper: R | ((element: boolean) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new BooleanCase(mapper), test));
    }

    caseEqual<R, E>(otherElement: E, mapper: R | ((element: E) => R)): Matcher<R> {
        return new Matcher(this.element, new EqualCase(otherElement, mapper));
    }

    caseEqualIf<R, E>(otherElement: E, test: (element: E) => boolean, mapper: R | ((element: E) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new EqualCase(otherElement, mapper), test));
    }

    caseNotEqual<R>(otherElement: any, mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new NotEqualCase(otherElement, mapper));
    }

    caseNotEqualIf<R>(otherElement: any, test: (element: any) => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NotEqualCase(otherElement, mapper), test));
    }

    caseNumber<R>(mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new NumberCase(mapper));
    }

    caseNumberIf<R>(test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberCase(mapper), test));
    }

    caseAlmostEqual<R>(otherElement: number, mapper: R | ((element: number) => R), acceptedError?: number): Matcher<R> {
        return new Matcher(this.element, new NumberAlmostEqualCase(otherElement, mapper, acceptedError));
    }

    caseAlmostEqualIf<R>(otherElement: number, test: (element: number) => boolean, mapper: R | ((element: number) => R), acceptedError?: number): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberAlmostEqualCase(otherElement, mapper, acceptedError), test));
    }

    caseGreaterThan<R>(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new NumberGreaterCase(otherElement, mapper));
    }

    caseGreaterThanIf<R>(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberGreaterCase(otherElement, mapper), test));
    }

    caseGreaterEqualThan<R>(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new NumberGreaterEqualCase(otherElement, mapper));
    }

    caseGreaterEqualThanIf<R>(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberGreaterEqualCase(otherElement, mapper), test));
    }

    caseLessThan<R>(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new NumberLessCase(otherElement, mapper));
    }

    caseLessThanIf<R>(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberLessCase(otherElement, mapper), test));
    }

    caseLessEqualThan<R>(otherElement: any, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new NumberLessEqualCase(otherElement, mapper));
    }

    caseLessEqualThanIf<R>(otherElement: any, test: (element: number) => boolean, mapper: R | ((element: number) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NumberLessEqualCase(otherElement, mapper), test));
    }

    caseNull<R>(mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new NullCase(mapper));
    }

    caseNullIf<R>(test: () => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NullCase(mapper), test));
    }

    caseNotNull<R>(mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new NotNullCase(mapper));
    }

    caseNotNullIf<R>(test: (element: any) => boolean, mapper: R | ((element: any) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new NotNullCase(mapper), test));
    }

    caseObject<R>(mapper: R | ((element: object) => R)): Matcher<R> {
        return new Matcher(this.element, new ObjectCase(mapper));
    }

    caseObjectIf<R>(test: (element: object) => boolean, mapper: R | ((element: object) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new ObjectCase(mapper), test));
    }

    caseObjectLike<R, O extends object>(other: O, mapper: R | ((element: O) => R)): Matcher<R> {
        return new Matcher(this.element, new ObjectLikeCase(other, mapper));
    }

    caseObjectLikeIf<R, O extends object>(other: O, test: (element: O) => boolean, mapper: R | ((element: O) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new ObjectLikeCase(other, mapper), test));
    }

    // todo change maper element type with a type that contains the checked keys
    caseObjectWithKeys<R, K extends Array<string>>(keys: K, mapper: R | ((element: Record<number, keyof K>) => R)): Matcher<R> {
        return new Matcher(this.element, new ObjectWithKeysCase(keys, mapper));
    }

    caseObjectWithKeysIf<R, K extends Array<string>>(keys: K, test: (element: object) => boolean, mapper: R | ((element: Record<number, keyof K>) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new ObjectWithKeysCase(keys, mapper), test));
    }

    caseString<R>(mapper: R | ((element: string) => R)): Matcher<R> {
        return new Matcher(this.element, new StringCase(mapper));
    }

    caseStringIf<R>(test: (element: string) => boolean, mapper: R | ((element: string) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new StringCase(mapper), test));
    }

    caseStringLike<R>(exp: RegExp, mapper: R | ((element: RegExpExecArray) => R)): Matcher<R> {
        return new Matcher(this.element, new StringLikeCase(exp, mapper));
    }

    caseStringLikeIf<R>(exp: RegExp, test: (element: string) => boolean, mapper: R | ((element: RegExpExecArray) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new StringLikeCase(exp, mapper), test));
    }

    caseEmptyString<R>(mapper: R | ((element: string) => R)): Matcher<R> {
        return new Matcher(this.element, new EmptyStringCase(mapper));
    }

    caseEmptyStringIf<R>(test: () => boolean, mapper: R | ((element: string) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new EmptyStringCase(mapper), test));
    }

    caseDate<R>(mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new DateCase(mapper));
    }

    caseDateIf<R>(test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new DateCase(mapper), test));
    }

    caseOlderThan<R>(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new DateOlderThanCase(other, mapper));
    }

    caseOlderThanIf<R>(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new DateOlderThanCase(other, mapper), test));
    }

    caseOlderEqualThan<R>(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new DateOlderEqualThanCase(other, mapper));
    }

    caseOlderEqualThanIf<R>(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new DateOlderEqualThanCase(other, mapper), test));
    }

    caseNewerThan<R>(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new DateNewerThanCase(other, mapper));
    }

    caseNewerThanIf<R>(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new DateNewerThanCase(other, mapper), test));
    }

    caseNewerEqualThan<R>(other: Date, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new DateNewerEqualThanCase(other, mapper));
    }

    caseNewerEqualThanIf<R>(other: Date, test: (element: Date) => boolean, mapper: R | ((element: Date) => R)): Matcher<R> {
        return new Matcher(this.element, new IfCase(new DateNewerEqualThanCase(other, mapper), test));
    }

    caseArray<R>(mapper: R | ((element: Array<any>) => R)) {
        return new Matcher(this.element, new ArrayCase(mapper));
    }

    caseArrayIf<R>(test: (element: Array<any>) => boolean, mapper: R | ((element: Array<any>) => R)) {
        return new Matcher(this.element, new IfCase(new ArrayCase(mapper), test));
    }

    caseEmptyArray<R>(mapper: R | ((element: Array<any>) => R)) {
        return new Matcher(this.element, new EmptyArrayCase(mapper));
    }

    caseEmptyArrayIf<R>(test: () => boolean, mapper: R | ((element: Array<any>) => R)) {
        return new Matcher(this.element, new IfCase(new EmptyArrayCase(mapper), test));
    }
}