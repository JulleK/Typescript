"use strict";
let userInput;
let userName;
userInput = 5;
userInput = "julek";
// userName = userInput;
function generateError(message, code) {
    throw { message, errorCode: code };
}
const result = generateError("An error occurred!", 500);
