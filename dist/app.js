"use strict";
var _a;
const userInput = document.querySelector("input");
if (userInput) {
    userInput.value = "Hi there";
}
const error = {
    username: "incorrect username",
    password: "incorrect password",
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add("a", 2);
const fetchedData = {
    id: "a1",
    name: "julek",
    job: { title: "CEO", description: "My own company" },
};
console.log((_a = fetchedData === null || fetchedData === void 0 ? void 0 : fetchedData.job) === null || _a === void 0 ? void 0 : _a.title);
//# sourceMappingURL=app.js.map