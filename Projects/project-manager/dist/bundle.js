"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    // Project Type
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />
var App;
(function (App) {
    // Autobind Decorator
    function autobind(_, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        addProject(title, description, numOfPeople) {
            const id = Math.random().toString();
            const newProject = new App.Project(id, title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(id, newStatus) {
            const project = this.projects.find((project) => project.id === id);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
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
        return true;
    }
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = (document.getElementById(templateId));
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId)
                this.element.id = newElementId;
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
        }
    }
    // Project Item Class
    class ProjectItem extends Component {
        get persons() {
            return this.project.people === 1
                ? "1 person"
                : `${this.project.people} persons`;
        }
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(event) { }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            // const listId = `${this.type}-projects-list`;
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    // Project List Class
    class ProjectList extends Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listElement = this.element.querySelector("ul");
                listElement.classList.add("droppable");
            }
        }
        dragLeaveHandler(event) {
            const listElement = this.element.querySelector("ul");
            listElement.classList.remove("droppable");
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData("text/plain");
            projectState.moveProject(projectId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            projectState.addListener((projects) => {
                const relevantProjects = projects.filter((project) => {
                    return this.type === "active"
                        ? project.status === App.ProjectStatus.Active
                        : project.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listElement = (document.getElementById(`${this.type}-projects-list`));
            listElement.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(listElement.id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
    }
    __decorate([
        autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dropHandler", null);
    // Project Input Class
    class ProjectInput extends Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            // assign the input elements of the form
            this.titleInputElement = (this.element.querySelector("#title"));
            this.descriptionInputElement = (this.element.querySelector("#description"));
            this.peopleInputElement = (this.element.querySelector("#people"));
            this.configure();
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
        renderContent() { }
    }
    const projInput = new ProjectInput();
    const activeList = new ProjectList("active");
    const finishedList = new ProjectList("finished");
})(App || (App = {}));
