class Department {
  static creationDate = 2024;

  showYear() {
    console.log(Department.creationDate);
  }

  employees: string[] = [];

  constructor(public readonly id: string, public name: string) {}

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  get lastEmployee() {
    if (this.employees) {
      return this.employees[this.employees.length - 1];
    }
    throw new Error("No employee found");
  }

  set lastEmployee(value: string) {
    this.addEmployee(value);
  }

  static createEmployee(name: string, age: number, section: string) {
    return { name, age, section };
  }
}

class ITDepartment extends Department {
  private static instance: ITDepartment;

  private constructor(id: string) {
    super(id, "IT");
  }

  printEmployees() {
    console.log(this.employees);
  }

  describe() {
    console.log("IT Department - ID:" + this.id);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ITDepartment("1");
    }
    return this.instance;
  }
}

const d = new Department("15", "itboy");
d.addEmployee("hej");
d.addEmployee("ja");
d.lastEmployee = "me";
console.log(d.lastEmployee);

const emp1 = Department.createEmployee("julek", 18, "it");

const IT = ITDepartment.getInstance();
