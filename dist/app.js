"use strict";
// interface Person {
//   name: string;
//   age: number;
class Person {
    constructor(name) {
        this.age = 30;
        this.name = name;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
//# sourceMappingURL=app.js.map