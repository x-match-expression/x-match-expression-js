import {match} from "../../../src/index";


test("caseAlmostEqual should match when two float numbers are very close", () => {

    const areAlmostEqual = match(0.6)
        .caseAlmostEqual(0.2 + 0.4, true)
        .default(false);

    expect(areAlmostEqual).toBeTruthy();
});
