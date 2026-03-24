let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    }

    // MARK COMPLETE
    li.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function (event) {
      event.stopPropagation();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    editBtn.onclick = function (event) {
      event.stopPropagation();
      let newTask = prompt("Edit your task:", task.text);

      if (newTask !== null && newTask !== "") {
        tasks[index].text = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      }
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  displayTasks();
}
let total = tasks.length;
let completed = tasks.filter(t => t.completed).length;
let pending = total - completed;

document.getElementById("counter").textContent =
  `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
displayTasks();