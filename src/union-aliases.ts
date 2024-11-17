function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

type YesOrNo = "yes" | "no";

const n1 = 5;
const n2 = 2.7;

const result = combine(n1, n2);
console.log(result);

let isTypescriptFun: YesOrNo;
