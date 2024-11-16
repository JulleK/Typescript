// const person: {
//   name: string;
//   age: number;
//   role: [number, string];
// } = {
//   name: "max",
//   age: 30,
//   role: [2, "author"],
// };

// console.log(person.name);

// let favoriteActivities: any[];

// const role: [number, string] = [2, "author"];

// role[1] = 1; // we can't do that
// role.push("admin"); // this works fine

// const ADMIN = 0;
// const AUTHOR = 1;
// const READ_ONLY = 2;

enum Role {
  ADMIN = 100,
  AUTHOR = 200,
  READ_ONLY = 300,
}

const person = {
  name: "max",
  age: 30,
  role: Role.AUTHOR,
};
