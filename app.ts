let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "julek";
// userName = userInput;

function generateError(message: string, code: number) {
  throw { message, errorCode: code };
}

const result = generateError("An error occurred!", 500);
