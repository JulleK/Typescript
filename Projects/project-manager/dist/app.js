"use strict";
// Project State Management
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    addProject(title, description, numOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            numOfPeople,
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
}
const projectState = ProjectState.getInstance();
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
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = (document.querySelector("#project-list"));
        this.hostElement = document.querySelector("#app");
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listElement = (document.getElementById(`${this.type}-projects-list`));
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listElement.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = (document.querySelector("#project-input"));
        this.hostElement = document.querySelector("#app");
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
            projectState.addProject(title, desc, people);
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
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
const projInput = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
