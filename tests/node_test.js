let {match} = require("../dist/umd/index.js");

let result = match(1)
    .caseEqual(1, "es uno")
    .default("no es uno");


console.log(result);