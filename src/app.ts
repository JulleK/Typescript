function Logger(target: Function) {
  console.log("Logging...");
  console.log(target);
}

@Logger
class Person {
  name = "julek";

  constructor() {
    console.log("Creating a person...");
  }
}

const pers = new Person();

// console.log(pers);
