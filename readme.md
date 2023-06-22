# JSONify

a json serialization lib, supported data type:

- number
- string
- boolean
- date
- regexp
- function, arrow function
- map
- set

# usage

```ts
import { stringify, parse } from "jsonify";

const obj = {
  a: null,
  b: undefined,
  c: 100,
  d: "dd",
  e: true,
  f: {},
  g: [],
  h: new Date(),
  i: new Set([11, 22, 33, new Set([55, 66, 77])]),
  j: new Map<any, any>([
    ["age", { age: 100 }],
    [{ age: 100 }, "age"],
  ]),
  k: function () {
    return this.a;
  },
  l: () => {
    return "arrow function";
  },
  m: /abc/g,
  n: new RegExp("abc", "img"),
};

const rt = stringify(obj, 2);
console.log(rt);
const rt2 = parse(rt);
console.log(rt2);
```
