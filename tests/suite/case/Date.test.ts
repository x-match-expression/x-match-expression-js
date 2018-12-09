import {match} from "../../../src/index";


test("caseDate match a date object (MatcherConstructor)", () => {
    const isADate = match(new Date())
        .caseDate(true)
        .default(false);

    expect(isADate).toBeTruthy();
});

test("caseDate match a date object (Matcher)", () => {
    const isADate = match(new Date())
        .withReturnType<boolean>()
        .caseDate(true)
        .default(false);

    expect(isADate).toBeTruthy();
});

