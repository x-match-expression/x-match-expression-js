import {match} from "../../../src/index";


test("caseOlderEqualThan match a date older than another one (MatcherConstructor)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .caseOlderEqualThan(new Date(2020, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseDateOlderEqualThan match a date older than another one (Matcher)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .withReturnType<boolean>()
        .caseOlderEqualThan(new Date(2020, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseOlderEqualThan match a date equal than another one (MatcherConstructor)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .caseOlderEqualThan(new Date(2000, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseDateOlderEqualThan match a date equal than another one (Matcher)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .withReturnType<boolean>()
        .caseOlderEqualThan(new Date(2000, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseOlderEqualThan dont match a date newer than another one (MatcherConstructor)", () => {
    const isADate = match(new Date(2020, 0, 1))
        .caseOlderEqualThan(new Date(2000, 0, 1), true)
        .default(false);

    expect(isADate).toBeFalsy();
});

test("caseDateOlderEqualThan dont match a date equal than another one (Matcher)", () => {
    const isADate = match(new Date(2020, 0, 1))
        .withReturnType<boolean>()
        .caseOlderEqualThan(new Date(2000, 0, 1), true)
        .default(false);

    expect(isADate).toBeFalsy();
});