"use strict";
const e1 = {
    name: "julek",
    privileges: ["create-server"],
    startDate: new Date(),
};
function printEmployeeInformation(emp) {
    console.log("name: " + emp.name);
    if ("privileges" in emp) {
        console.log("privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("start date: " + emp.startDate);
    }
}
function add(a, b) {
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
    loadCargo(amount) {
        console.log(`loading ${amount} cargo`);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck)
        vehicle.loadCargo(100);
}
//# sourceMappingURL=app.js.map