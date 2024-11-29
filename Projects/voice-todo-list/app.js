"use strict";
const taskInput = document.querySelector("#task-input");
const taskAddBtn = document.querySelector("#task-add-btn");
const taskVoiceBtn = (document.querySelector("#task-voice-btn"));
const taskList = document.querySelector("#task-list");
const tasks = [
    { id: 0, text: "tttttttttttt", completed: false },
    { id: 1, text: "test", completed: false },
];
let taskId = tasks.length;
displayTasks();
taskAddBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    const value = taskInput.value.trim();
    if (value) {
        addTask(value);
    }
    taskInput.value = "";
});
taskVoiceBtn.addEventListener("click", addTaskWithVoice);
function addTask(text) {
    const task = { id: taskId++, text, completed: false };
    tasks.push(task);
    displayTasks();
}
function displayTasks() {
    // console.log(tasks);
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const div = document.createElement("div");
        div.classList.add("task", "noselect");
        div.innerHTML = `
        <input type="checkbox" id="task-${task.id}" ${task.completed && "checked"} />
        <label for="task-${task.id}">${task.text}</label
        ><span class="delete" id="delete-${task.id}">x</span>
    `;
        taskList.appendChild(div);
        const checkbox = (document.querySelector(`#task-${task.id}`));
        addCheckboxListener(checkbox, task.id);
        const deleteBtn = (document.querySelector(`#delete-${task.id}`));
        addDeleteListener(deleteBtn, task.id);
    });
}
function addCheckboxListener(checkbox, id) {
    checkbox.addEventListener("click", () => {
        checkboxClick(id);
    });
}
function addDeleteListener(deleteBtn, id) {
    deleteBtn.addEventListener("click", () => {
        deleteTask(id);
    });
}
function checkboxClick(id) {
    for (let task of tasks) {
        if (task.id === id)
            task.completed = !task.completed;
    }
}
function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
        }
    }
    displayTasks();
}
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
try {
    var recognition = new speechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // Don't process interim results
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
        console.log("Voice recognition started. Speak now...");
    };
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log(`Received text: ${transcript}`);
        addTask(transcript);
    };
    recognition.onspeechend = () => {
        recognition.stop();
    };
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };
}
catch (error) {
    console.log(error);
    console.log("Speech Recognition is not supported in your browser.");
}
function addTaskWithVoice() {
    if (!speechRecognition || !recognition) {
        alert("Speech Recognition is not supported in your browser.");
        return;
    }
    recognition.start();
}
//# sourceMappingURL=app.js.map