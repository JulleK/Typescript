type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
type UnknownEmployee = Admin | Employee;

const e1: ElevatedEmployee = {
  name: "julek",
  privileges: ["create-server"],
  startDate: new Date(),
};

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("name: " + emp.name);

  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("start date: " + emp.startDate);
  }
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log(`loading ${amount} cargo`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(100);
}
