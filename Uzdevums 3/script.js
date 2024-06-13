document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
  const darkModeButton = document.getElementById("darkModeButton");
  darkModeButton.addEventListener("click", toggleDarkMode);

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

function toggleDarkMode() {
  const darkModeButton = document.getElementById("darkModeButton");
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    darkModeButton.textContent = "Ieslēgt tumšo režīmu";
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    darkModeButton.textContent = "Izslēgt tumšo režīmu";
  }
}


function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var taskList = document.getElementById("taskList");
  var completedTaskList = document.getElementById("completedTaskList");
  var incompleteCount = 0;
  var completedCount = 0;

  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  tasks.forEach(function(task, index) {
    var li = document.createElement("li");
    li.className = "collection-item";
    
    var taskContent = document.createElement("span");
    taskContent.className = "task-content";
    taskContent.textContent = task.name;

    if (task.completed) {
      taskContent.classList.add("completed");
      li.appendChild(taskContent);
      completedTaskList.appendChild(li);
      completedCount++;
    } else {
      var buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
      
      var completeButton = document.createElement("button");
      completeButton.className = "btn-small green";
      completeButton.innerHTML = '<i class="fas fa-check"></i> Pabeigts';
      completeButton.onclick = function() {
        completeTask(index);
      };

      var deleteButton = document.createElement("button");
      deleteButton.className = "btn-small red";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i> Dzēst';
      deleteButton.onclick = function() {
        deleteTask(index);
      };

      buttonContainer.appendChild(completeButton);
      buttonContainer.appendChild(deleteButton);
      
      li.appendChild(taskContent);
      li.appendChild(buttonContainer);
      taskList.appendChild(li);
      incompleteCount++;
    }

    taskContent.addEventListener("dblclick", function() {
      editTask(index);
    });
  });

  document.getElementById("incompleteCount").textContent = incompleteCount;
  document.getElementById("completedCount").textContent = completedCount;
}

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var task = taskInput.value.trim();
  if (task !== "") {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  } else {
    alert("Lūdzu, ievadiet uzdevumu, lai pievienotu!");
  }
}

function deleteTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function completeTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var newTaskName = prompt("Labot uzdevumu nosaukumu:", tasks[index].name);
  if (newTaskName !== null) {
    tasks[index].name = newTaskName.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

