// Project State Management

class ProjectState {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  addProject(title: string, description: string, numOfPeople: number) {
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

  addListener(listenerFn: Function) {
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

// Validation

interface validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: validatable) {
  const {
    value,
    required,
    minLength = 0,
    maxLength = 30,
    min = 0,
    max = 10,
  } = input;

  if (!value.toString().trim() && required) return false;

  if (typeof value === "string") {
    const length = value.trim().length;
    if (length < minLength || length > maxLength) return false;
  }

  if (typeof value === "number") {
    if (value < min || value > max) return false;
  }

  console.log("valid input");
  return true;
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector("#project-list")
    );
    this.hostElement = <HTMLDivElement>document.querySelector("#app");
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listElement = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)
    );
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listElement.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector("#project-input")
    );
    this.hostElement = <HTMLDivElement>document.querySelector("#app");

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";

    // assign the input elements of the form
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const userTitle = this.titleInputElement.value;
    const userDescription = this.descriptionInputElement.value;
    const userPeople = this.peopleInputElement.value;

    if (
      !validate({ value: userTitle, required: true, minLength: 3 }) ||
      !validate({ value: userDescription, required: true, minLength: 5 }) ||
      !validate({ value: +userPeople, required: true, min: 1 })
    ) {
      alert("Invalid input, please try again!");
      return;
    }
    return [userTitle, userDescription, +userPeople];
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private configure() {
    this.element.addEventListener("submit", (event) =>
      this.submitHandler(event)
    );
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projInput = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
