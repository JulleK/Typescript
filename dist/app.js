"use strict";
class Department {
    showYear() {
        console.log(Department.creationDate);
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    get lastEmployee() {
        if (this.employees) {
            return this.employees[this.employees.length - 1];
        }
        throw new Error("No employee found");
    }
    set lastEmployee(value) {
        this.addEmployee(value);
    }
    static createEmployee(name, age, section) {
        return { name, age, section };
    }
}
Department.creationDate = 2024;
class ITDepartment extends Department {
    constructor(id) {
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
//# sourceMappingURL=app.js.map