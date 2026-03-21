function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  let li = document.createElement("li");
  li.textContent = task;

  // MARK COMPLETE (CLICK)
  li.onclick = function () {
    li.style.textDecoration = "line-through";
    li.style.color = "gray";
  };

  // DELETE BUTTON
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.onclick = function (event) {
  event.stopPropagation(); // IMPORTANT LINE
  li.remove();
  };

  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}