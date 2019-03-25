# Overview
x-match-expression is a javascript pattern matching library developed in typescript that can be used standalone in the browser, in node or as ES module.


### Installation
- Install it with `npm install --save x-match-expression` or reference it from CDN in the browser

### Usage

#### In the browser (with a script tag)

- Add a script tag `<script src="https://unpkg.com/x-match-expression/dist/browser/index.js" type="application/javascript"></script>`
- And later on, use the global `match` function
```javascript
 const financialStatus = match(42)
    .caseGreaterEqualThan(1000000, "I'm rich!")
    .caseLessThan(0, "I'm ruined")
    .default("I keep trying");
 console.log(financialStatus); // outputs I keep trying
```

#### In Node

```javascript
const {match} = require("x-match-expression");

const isEven = match(2)
    .case(n => n % 2 === 0, true)
    .default(false);
 console.log(isEven); // outputs true
```

#### as ES Module

```javascript
import {match} from "x-match-expression";

const areWeInTheFuture = match(new Date())
    .caseNewerThan(new Date(2050, 0, 1), true)
    .default(false);
 console.log(areWeInTheFuture); // outputs false
```

### API

If you are using typescript or an IDE with autocompletion, just write match. and explore all the options available.
Basically you have cases for every javascript primitive type + instance checks. Almost every case method has a companion
method ended in "If"; This allows to put an extra predicate if the case is not enough. To end the match expression use
default method.

### Advanced Usage

#### Instance check example

```typescript
import {match} from "x-match-expression";

class FatalError {
    constructor(readonly id: string, readonly date: Date) {}
}

class Warning {
    constructor(readonly title: string, readonly message: string) {}
}

class MailMessage {
    constructor(readonly sender: string, readonly subject: string, readonly message: string) {}
}

type Whatever =
    FatalError |
    Warning |
    MailMessage;

const info = getInfo(); // returns type Whatever

const infoDetails = match(info)
    .caseInstanceIf(FatalError, _ => _.id === 404 => `No content found at ${e.date.toISOString()}`)
    .caseInstance(FatalError, _ => `Error #${_.id} received`)
    .caseInstance(Warning, _ => `Warning ${_.title}: ${_.message}`)
    .caseInstance(MailMessage, _ => `You received a message from ${_.sender}`)
    .default("Unknown information received");
```

#### Float comparison

```typescript
import {match} from "x-match-expression";

const a = 0.2;
const b = 0.4;
const c = 0.6;
const whatHappens = match(a+b)
    .caseEqual(c, "This number is 0.6")
    .caseAlmostEqual(c, "The number is not exactly 0.6, but it is very close") // <-- this will match
    .default("This number is not 0.6 at all");
```

#### Custom test that fails

```javascript
import {match} from "x-match-expression";

function isSomething(x) {
    throw "Error!"; // <-- look at this
}

const value = match(x)
    .case(isSomething, "This is something") // <-- custom tests doesn't raise exceptions, they simple return false
    .default("This is nothing");
```

#### With union type as return

```typescript
import {match} from "x-match-expression";

const twice: number | string = match("hello world")
    .caseString(s => `${s}${s}`)
    .caseNumber(n => n*2)
    .default(0);
```