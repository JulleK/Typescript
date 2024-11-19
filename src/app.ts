class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}
}

class ITDepartment extends Department {
  constructor(id: string) {
    super(id, "IT");
  }

  printEmployees() {
    console.log(this.employees);
  }
}
