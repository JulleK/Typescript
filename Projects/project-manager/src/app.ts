class ProjectInput {
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.querySelector("#project-input")
    );
    this.targetElement = <HTMLDivElement>document.querySelector("#app");

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

    if (!userTitle.trim() || !userDescription.trim() || !userPeople.trim()) {
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
      console.log(title, desc, people);
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
    this.targetElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projInput = new ProjectInput();
