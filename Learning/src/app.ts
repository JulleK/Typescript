function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(hookId: string) {
  return function (constructor: any) {
    const p = new constructor();
    const element = document.getElementById(hookId);
    if (element) {
      element.innerHTML = p.name;
    }
  };
}

function FirstDecorator() {
  console.log("I am first");
  return function (constructor: Function) {};
}

function SecondDecorator() {
  console.log("I am second");
  return function (constructor: Function) {};
}

// @SecondDecorator()
// @FirstDecorator()
// @WithTemplate("app")
class Person {
  name = "julek";

  constructor() {
    console.log("Creating a person...");
  }
}

// const pers = new Person();

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target);
  console.log(propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Product {
  // @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // @Log2
  set price(value: number) {
    if (value > 0) this._price = value;
  }

  @Log3
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

// console.log(pers);
