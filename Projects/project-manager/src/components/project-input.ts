namespace App {
  // Project Input Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
