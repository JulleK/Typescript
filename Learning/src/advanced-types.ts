const userInput = document.querySelector("input");

if (userInput) {
  (userInput as HTMLInputElement).value = "Hi there";
}

interface ErrorContainer {
  [prop: string]: string;
}

const error: ErrorContainer = {
  username: "incorrect username",
  password: "incorrect password",
};

type Combinable = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("a", 2);

const fetchedData = {
  id: "a1",
  name: "julek",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedData?.job?.title);

const input = "";
const storedData = input ?? "DEFAULT";
