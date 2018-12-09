import {match} from "../../../src/index";


test("caseInstance should match an element constructed by a function", () => {

    // @ts-ignore
    const x = new FunctionConstructor();

    const wasConstructedByFunction = match(x)
        .caseInstance(FunctionConstructor, true)
        .default(false);

    expect(wasConstructedByFunction).toBeTruthy();
});

test("caseInstance should match an element constructed by a function and use the instance in the mapper", () => {

    // @ts-ignore
    const x = new FunctionConstructor();

    const origin = match(x)
        .caseInstance(FunctionConstructor, e => e.origin)
        .default("unknown");

    expect(origin).toBe("function");
});

test("caseInstance should NOT match an element when it is not an instance of the function", () => {

    // @ts-ignore
    const x = new AnotherFunctionConstructor();

    const wasConstructedByFunction = match(x)
        .caseInstance(FunctionConstructor, true)
        .default(false);

    expect(wasConstructedByFunction).toBeFalsy();
});

test("caseInstance should NOT match an element when it is not an instance", () => {

    const x = 12345;

    const wasConstructedByFunction = match(x)
        .caseInstance(FunctionConstructor, true)
        .default(false);

    expect(wasConstructedByFunction).toBeFalsy();
});

test("caseInstance should match an instance of the class", () => {

    const x = new ClassConstructor();

    const wasConstructedByClass = match(x)
        .caseInstance(ClassConstructor, true)
        .default(false);

    expect(wasConstructedByClass).toBeTruthy();
});

test("caseInstance should match an instance of the class and use the typed instance in the mapper", () => {

    const x = new ClassConstructor();

    /*
    If you use a class instead of a function in the first parameter of caseInstance,
    you will get a typed variable in the mapper instead of 'any'. This is very handy!
    */
    const origin = match(x)
        .caseInstance(ClassConstructor, e => e.origin)
        .default("unknown");

    expect(origin).toBe("class");
});

test("caseInstance should NOT match an element when it is not an instance of the class", () => {

    const x = new AnotherClassConstructor();

    const wasConstructedByFunction = match(x)
        .caseInstance(FunctionConstructor, true)
        .default(false);

    expect(wasConstructedByFunction).toBeFalsy();
});

test("caseInstance should NOT match an element when it is not an instance", () => {

    const x = 12345;

    const wasConstructedByFunction = match(x)
        .caseInstance(ClassConstructor, true)
        .default(false);

    expect(wasConstructedByFunction).toBeFalsy();
});

function FunctionConstructor() {
    // @ts-ignore
    this.origin = "function";
}

function AnotherFunctionConstructor() {
    // @ts-ignore
    this.origin = "another function";
}

class ClassConstructor {
    origin = "class";
}

class AnotherClassConstructor {
    origin = "another class";
}