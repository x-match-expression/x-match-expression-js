

xtest("fasdas", () => {
    const cosa = tuple("a", "b");
    const instance = f(cosa);
    instance.a;
    const cosa2 = tuple2(["a", "b"]);

})

function tuple<T extends string[]>(...a: T) :T{
    return a;
}

function f<T extends Array<keyof any>>(props:T): Record<T[number], string> {
    return null!;
}

function tuple2<T extends string[]>(a: T) :T{
    return a;
}