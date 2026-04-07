let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.textContent = `${task.text} (Due: ${task.date || "No date"})`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = function () {
      let newTask = prompt("Edit task:", task.text);
      if (newTask) {
        tasks[index].text = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
  });

  // ✅ COUNTER
  document.getElementById("counter").textContent =
    `Total: ${tasks.length} | Completed: 0 | Pending: ${tasks.length}`;

  // ✅ TITLE UPDATE (DAY 15 FEATURE)
  document.title = `(${tasks.length}) Study Planner`;
}

function addTask() {
  let input = document.getElementById("taskInput");
  let dateInput = document.getElementById("dueDate");

  let task = input.value.trim();
  let date = dateInput.value;

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: task, date: date });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  dateInput.value = "";

  displayTasks();
}

function clearAllTasks() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// 👉 PAGE LOAD PE RUN
displayTasks();
function showTodayDate() {
  const today = new Date();
  const formatted = today.toDateString();
  document.getElementById("todayDate").textContent = "📅 Today: " + formatted;
}

showTodayDate();