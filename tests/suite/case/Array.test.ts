import {match} from "../../../src/index";


test("caseEmptyArray should match", () => {

    const isEmptyArray = match([])
        .caseArray(true)
        .default(false);

    expect(isEmptyArray).toBeTruthy();
});

test("caseArray should match", () => {

    const isArray = match(["a", "b"])
        .caseArray(true)
        .default(false);

    expect(isArray).toBeTruthy();
});

test("caseArrayIf should match", () => {

    const lenIs3 = match([1, 2, 3])
        .caseArrayIf(a => a.length === 3, true)
        .default(false);

    expect(lenIs3).toBeTruthy();
});
