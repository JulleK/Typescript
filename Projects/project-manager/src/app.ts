/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />

namespace App {
  // Autobind Decorator
  function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

  // Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const id = Math.random().toString();
      const newProject = new Project(
        id,
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(id: string, newStatus: ProjectStatus) {
      const project = this.projects.find((project) => project.id === id);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
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

    return true;
  }

  // Component Base Class
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateId)
      );
      this.hostElement = <T>document.getElementById(hostElementId);

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );

      this.element = <U>importedNode.firstElementChild;
      if (newElementId) this.element.id = newElementId;
      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  // Project Item Class
  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      return this.project.people === 1
        ? "1 person"
        : `${this.project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    @autobind
    dragEndHandler(event: DragEvent) {}

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      // const listId = `${this.type}-projects-list`;
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }

  // Project List Class
  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listElement = this.element.querySelector("ul")!;
        listElement.classList.add("droppable");
      }
    }

    @autobind
    dragLeaveHandler(event: DragEvent) {
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.remove("droppable");
    }

    @autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((project) => {
          return this.type === "active"
            ? project.status === ProjectStatus.Active
            : project.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    private renderProjects() {
      const listElement = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)
      );
      listElement.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(listElement.id, prjItem);
      }
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }
  }

  // Project Input Class
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

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

    configure() {
      this.element.addEventListener("submit", (event) =>
        this.submitHandler(event)
      );
    }

    renderContent() {}
  }

  const projInput = new ProjectInput();
  const activeList = new ProjectList("active");
  const finishedList = new ProjectList("finished");
}
