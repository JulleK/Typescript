"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(hookId) {
    return function (constructor) {
        const p = new constructor();
        const element = document.getElementById(hookId);
        if (element) {
            element.innerHTML = p.name;
        }
    };
}
function FirstDecorator() {
    console.log("I am first");
    return function (constructor) { };
}
function SecondDecorator() {
    console.log("I am second");
    return function (constructor) { };
}
// @SecondDecorator()
// @FirstDecorator()
// @WithTemplate("app")
class Person {
    constructor() {
        this.name = "julek";
        console.log("Creating a person...");
    }
}
// const pers = new Person();
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target);
    console.log(propertyName);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(value) {
        if (value > 0)
            this._price = value;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
// console.log(pers);
//# sourceMappingURL=app.js.map