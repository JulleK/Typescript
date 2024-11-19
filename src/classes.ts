class Person {
  // name: string;
  hobbies: string[] = [];

  constructor(private name: string) {}

  greet(this: Person) {
    console.log("hello " + this.name);
  }

  addHobby(hobby: string) {
    this.hobbies.push(hobby);
  }

  printHobbies() {
    console.log(this.hobbies);
  }

  // private printName() {
  //   console.log(this.name);
  // }
}

const max = new Person("max");

max.greet();
max.addHobby("programming");

max.hobbies[1] = "hacking";
max.printHobbies();

// const maxCopy = { greet: max.greet };

// maxCopy.greet();
