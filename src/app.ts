interface Named {
  name?: string;
  outputName?: string;
  //   greet: (name: string) => void;
}

class Person implements Named {
  name?: string;
  age = 30;

  constructor(name: string) {
    if (name) this.name = name;
  }

  //   greet(phrase: string): void {
  //     console.log(phrase + " " + this.name);
  //   }
}
