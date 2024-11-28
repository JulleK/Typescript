function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result: " + num);
}

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5;

console.log(combineValues(1, 2));

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
  const result = n1 + n2;
  callback(result);
}
