import {match} from "../../../src/index";


test("caseOlderThan match a date older than another one (MatcherConstructor)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .caseOlderThan(new Date(2020, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseDateOlderThan match a date older than another one (Matcher)", () => {
    const isADate = match(new Date(2000, 0, 1))
        .withReturnType<boolean>()
        .caseOlderThan(new Date(2020, 0, 1), true)
        .default(false);

    expect(isADate).toBeTruthy();
});
