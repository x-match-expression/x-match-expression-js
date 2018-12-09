import {match} from "../../../src/index";


test("caseEqual should not match when float numbers with slighly differences are involved", () => {

    const areEqual = match(0.6)
        .caseEqual(0.2 + 0.4, true)
        .default(false);

    expect(areEqual).toBeFalsy();
});

test("caseEqual should match when the same integer number is checked", () => {

    const areEqual = match(1234)
        .caseEqual(1234, true)
        .default(false);

    expect(areEqual).toBeTruthy();
});
