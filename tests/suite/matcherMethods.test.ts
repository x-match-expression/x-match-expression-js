import {Matcher} from "../../src/matcher";
import {MatcherConstructor} from "../../src/matcherConstructor";


/*
 The purpose of this test is to check if both matcher implementations contains
 the same case* methods just in case I forgot something
 */
test("MatcherConstructor and Matcher classes contains the same case methods", () => {
    const matcherConstructor = new MatcherConstructor("x");
    const matcher = new Matcher("x");

    for (let key in matcherConstructor) {
        if (isCaseMethod(matcherConstructor, key) && (matcher as any)[key] == null)
            fail(`${key} method is not in Matcher`);
    }

    for (let key in matcher) {
        if (isCaseMethod(matcher, key) && (matcherConstructor as any)[key] == null)
            fail(`${key} method is not in MatcherConstructor`);
    }
});

function isCaseMethod(instance: object, method: string) {
    return /^case.*/.test(method) && typeof (instance as any)[method] === "function";
}