// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: "julek",
//   age: 18,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

interface Named {
  name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}

let p: Greetable;
p = new Person("harryu");

p.name = "harry";

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
