let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function displayTasks() {
  if (tasks.length === 0) {
  taskList.innerHTML = "<p style='text-align:center; color:gray;'>No tasks yet 🚀</p>";
  
  // counter reset
  document.getElementById("counter").textContent =
    "Total: 0 | Completed: 0 | Pending: 0";

  // title update
  document.title = "(0) Study Planner";

  return;
}
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "<p style='text-align:center;'>📭 No tasks yet 🚀</p>";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.textContent = `${task.text} (Due: ${task.date || "No date"})`;

    // ✅ completed class apply
    if (task.completed) {
      li.classList.add("completed");
    }

    // ✅ click toggle complete
    li.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    // ❌ delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function (e) {
      e.stopPropagation(); // important (click conflict avoid)
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    // ✏️ edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = function (e) {
      e.stopPropagation(); // important
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
 let completed = tasks.filter(t => t.completed).length;
let total = tasks.length;
let pending = total - completed;
let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

document.getElementById("counter").textContent =
  `Total: ${total} | Completed: ${completed} | Pending: ${pending} | Progress: ${percent}%`;
  // ✅ TITLE UPDATE
  document.title = `(${tasks.length}) Study Planner`;
}

function addTask() {
  let input = document.getElementById("taskInput");
  let dateInput = document.getElementById("dueDate");

  let task = input.value.trim();
task = task.charAt(0).toUpperCase() + task.slice(1);
  let date = dateInput.value;

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: task, date: date, completed: false });

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

function showTodayDate() {
  const today = new Date();
  const formatted = today.toDateString();
  document.getElementById("todayDate").textContent =
    "📅 Today: " + formatted;
}

// ✅ RUN ON LOAD
displayTasks();
showTodayDate();