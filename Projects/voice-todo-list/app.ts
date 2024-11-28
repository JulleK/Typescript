const taskInput = <HTMLInputElement>document.querySelector("#task-input");
const taskAddBtn = <HTMLButtonElement>document.querySelector("#task-add-btn");
const taskVoiceBtn = <HTMLButtonElement>(
  document.querySelector("#task-voice-btn")
);
const taskList = <HTMLUListElement>document.querySelector("#task-list");

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const tasks: Task[] = [
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

function addTask(text: string) {
  const task: Task = { id: taskId++, text, completed: false };
  tasks.push(task);
  displayTasks();
}

function displayTasks() {
  console.log(tasks);
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task", "noselect");
    div.innerHTML = `
        <input type="checkbox" id="task-${task.id}" ${
      task.completed && "checked"
    } />
        <label for="task-${task.id}">${task.text}</label
        ><span class="delete" id="delete-${task.id}">x</span>
    `;
    taskList.appendChild(div);
    const checkbox = <HTMLInputElement>(
      document.querySelector(`#task-${task.id}`)
    );
    addCheckboxListener(checkbox, task.id);

    const deleteBtn = <HTMLSpanElement>(
      document.querySelector(`#delete-${task.id}`)
    );
    addDeleteListener(deleteBtn, task.id);
  });
}

function addCheckboxListener(checkbox: HTMLInputElement, id: number) {
  checkbox.addEventListener("click", () => {
    checkboxClick(id);
  });
}

function addDeleteListener(deleteBtn: HTMLSpanElement, id: number) {
  deleteBtn.addEventListener("click", () => {
    deleteTask(id);
  });
}

function checkboxClick(id: number) {
  for (let task of tasks) {
    if (task.id === id) task.completed = !task.completed;
  }
}

function deleteTask(id: number) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
    }
  }
  displayTasks();
}

// -- CHAT GPT --
// Voice Command Integration
// function addTaskWithVoice() {
//   // Check if browser supports SpeechRecognition
//   const SpeechRecognition =
//     (window as any).SpeechRecognition ||
//     (window as any).webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     alert("Speech Recognition is not supported in your browser.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = "en-US"; // Set language to English
//   recognition.interimResults = false; // Don't process interim results
//   recognition.maxAlternatives = 1;

//   recognition.start();

//   recognition.onstart = () => {
//     console.log("Voice recognition started. Speak now...");
//   };

//   recognition.onresult = (event: SpeechRecognitionEvent) => {
//     const transcript = event.results[0][0].transcript;
//     console.log(`Recognized: ${transcript}`);
//     addTask(transcript); // Add recognized text as a task
//   };

//   recognition.onspeechend = () => {
//     recognition.stop();
//   };

//   recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//     console.error("Speech recognition error:", event.error);
//   };
// }
