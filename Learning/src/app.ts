function Logger() {
  return function (constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
  };
}

@Logger()
class Person {
  name = "julek";

  constructor() {
    console.log("Creating a person...");
  }
}

const pers = new Person();

// console.log(pers);
