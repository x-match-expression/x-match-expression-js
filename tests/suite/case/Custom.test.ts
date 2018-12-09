import {match} from "../../../src/index";


test("case should match when test returns true", () => {

    const doesMatch = match("whatever")
        .case(() => true, true)
        .default(false);

    expect(doesMatch).toBeTruthy();
});

test("case should not match when test returns false", () => {

    const doesMatch = match("whatever")
        .case(() => true, true)
        .default(false);

    expect(doesMatch).toBeTruthy();
});

test("case should not raise exceptions when test throws exception", () => {

    const test = () => {
        throw "ops!";
        return true;
    };

    const doesMatch = match("whatever")
        .case(test, true)
        .default(false);

    expect(doesMatch).toBeFalsy();
});

test("case should not raise exceptions when test fails", () => {

    const test = (element: any) => {
        return element.a.b.c.d.e.f === "something";
    };

    const doesMatch = match("whatever")
        .case(test, true)
        .default(false);

    expect(doesMatch).toBeFalsy();
});

test("case should set return type with the mapper", () => {

    const test = (element: any) => typeof element === "string";

    // this returns a number, so the return type is set by this mapper function
    // because it is the first case used in the match
    const stringLenght = (s: string) => s.length;

    // look at len. it should be seen as 'number' by typescript
    const len = match("hello")
        .case(test, stringLenght)
        .default(0); // <--- because return type was 'set' implicitly before, this must be also a number

    expect(len).toBe(5);
});
