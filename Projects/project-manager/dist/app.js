"use strict";
function validate(input) {
    const { value, required, minLength = 0, maxLength = 30, min = 0, max = 10, } = input;
    if (!value.toString().trim() && required)
        return false;
    if (typeof value === "string") {
        const length = value.trim().length;
        if (length < minLength || length > maxLength)
            return false;
    }
    if (typeof value === "number") {
        if (value < min || value > max)
            return false;
    }
    console.log("valid input");
    return true;
}
class ProjectInput {
    constructor() {
        this.templateElement = (document.querySelector("#project-input"));
        this.targetElement = document.querySelector("#app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        // assign the input elements of the form
        this.titleInputElement = (this.element.querySelector("#title"));
        this.descriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const userTitle = this.titleInputElement.value;
        const userDescription = this.descriptionInputElement.value;
        const userPeople = this.peopleInputElement.value;
        if (!validate({ value: userTitle, required: true, minLength: 3 }) ||
            !validate({ value: userDescription, required: true, minLength: 5 }) ||
            !validate({ value: +userPeople, required: true, min: 1 })) {
            alert("Invalid input, please try again!");
            return;
        }
        return [userTitle, userDescription, +userPeople];
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    configure() {
        this.element.addEventListener("submit", (event) => this.submitHandler(event));
    }
    attach() {
        this.targetElement.insertAdjacentElement("afterbegin", this.element);
    }
}
const projInput = new ProjectInput();
