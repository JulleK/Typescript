"use strict";
class Person {
    constructor(name) {
        this.name = name;
        // name: string;
        this.hobbies = [];
    }
    greet() {
        console.log("hello " + this.name);
    }
    addHobby(hobby) {
        this.hobbies.push(hobby);
    }
    printHobbies() {
        console.log(this.hobbies);
    }
    printName() {
        console.log(this.name);
    }
}
const max = new Person("max");
max.greet();
max.addHobby("programming");
max.hobbies[1] = "hacking";
max.printHobbies();
// const maxCopy = { greet: max.greet };
// maxCopy.greet();
//# sourceMappingURL=app.js.map