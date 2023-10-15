const taskInput = document.getElementById("taskInput");
const daySelector = document.getElementById("daySelector");
const taskList = document.getElementById("taskList");
const savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
const message = document.getElementById("message");

function saveTask() {
const taskText = taskInput.value.trim();
const selectedDay = daySelector.value;

if (taskText !== "") {
const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <div class="task">
    <span>${taskText} (Day: ${selectedDay})</span>
    <button onclick="removeTask(this)">Delete</button>
    </div>
`;
    taskList.appendChild(taskItem);
    taskInput.value = "";
    savedTasks.push(taskItem.innerHTML);
    saveTasksToLocalStorage();
  }
}

function removeTask(button) {
const taskItem = button.parentElement.parentElement;
  taskList.removeChild(taskItem);
}

function saveTasksToLocalStorage() {
localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  showMessage("Task has been saved!");
}

function clearSavedDays() {
localStorage.removeItem("savedTasks");
  savedTasks.length = 0;
  taskList.innerHTML = '';
  showMessage("Saved tasks have been cleared!");
}

function showMessage(text) {
  message.textContent = text;
  message.style.display = "block";
  setTimeout(() => {
    message.textContent = '';
    message.style.display = "none";
  }, 5000);
}

function loadSavedTasks() {
if (savedTasks.length > 0) {
for (const taskHTML of savedTasks) {
const taskItem = document.createElement("li");
    taskItem.innerHTML = taskHTML;
    taskList.appendChild(taskItem);
    }
  }
}

loadSavedTasks();
