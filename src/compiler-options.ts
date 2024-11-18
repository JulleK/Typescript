let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "julek";
// userName = userInput;

function generateError(message: string, code: number) {
  throw { message, errorCode: code };
}

// const result = generateError("An error occurred!", 500);

function sendAnalytics(data: string) {
  let username = "max";
  console.log(data);
}

sendAnalytics("the data");

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", sendAnalytics.bind(null, "haha"));
}

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
}
