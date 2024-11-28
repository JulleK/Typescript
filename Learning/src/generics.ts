// const names: Array<string> = ["max", "julek"];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("this is done");
//   }, 2000);
// });

// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return { ...objA, ...objB };
// }

// const mergedObj = merge({ name: "julek" }, { age: 18 });
// const mergedObj2 = merge({ height: 150 }, { width: 100 });

// // const mergedObj3 = merge("hej", "ka");

// console.log(mergedObj.name);
// console.log(mergedObj2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(input: T): [T, string] {
  // pass in a string or array
  //  get back the length of elements
  let description = "Got no value";

  if (input.length === 1) {
    description = `Got 1 element`;
  } else if (input.length > 0) {
    description = `Got ${input.length} elements`;
  }

  return [input, description];
}

console.log(countAndDescribe("Hello there"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

// console.log(extractAndConvert({}, "name"));

class DataStorage<T extends string | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("max");
textStorage.removeItem("max");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(15);

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["max", "anna"];
// names.push("julek");
