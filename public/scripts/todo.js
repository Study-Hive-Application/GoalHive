document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  AOS.init();

  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const completedTaskList = document.getElementById("completedTaskList");
  const showMoreBtn = document.getElementById("showMoreBtn");

  let completedTasks = []; // Store completed tasks

  // Fetch and display tasks on page load
  async function fetchTasks() {
    try {
      // Fetch pending tasks
      const pendingResponse = await fetch("/todo?type=pending");
      console.log("Status:", pendingResponse.status);

      const pendingTasks = await pendingResponse.json();
      console.log("Pending tasks:", pendingTasks.tasks);
      pendingTasks.tasks.forEach((task) => {
        createTaskElement(task, false);
      });

      // Fetch completed tasks
      const completedResponse = await fetch("/todo?type=completed");
      console.log("Status:", completedResponse.status);

      const completedTasksData = await completedResponse.json();
      completedTasksData.tasks.forEach((task) => {
        createTaskElement(task, true);
      });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  fetchTasks(); // Fetch tasks when the page loads

  // Add a new task
  addTaskBtn.addEventListener("click", async () => {
    const taskName = taskInput.value.trim();
    const date = taskDate.value;
    if (!taskName || !date) {
      alert("Please enter a task description and due date.");
      return;
    }

    try {
      const response = await fetch("/todo?type=add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName: taskName, dueDate: date }),
      });
      const newTask = await response.json();
      if (!response.ok) {
        return alert(`${newTask.message}`);
      }

      console.log("Added Task: ", newTask);
      createTaskElement(newTask.task, false);

      // Clear input fields
      taskInput.value = "";
      taskDate.value = "";
    } catch (err) {
      console.error("Error adding task:", err);
    }
  });

  // Create Task Element
  function createTaskElement(task, isCompleted) {
    const taskElement = document.createElement("div");
    taskElement.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "p-2",
      "border",
      "rounded"
    );
    taskElement.innerHTML = `
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${isCompleted ? "checked disabled" : ""}
        data-id="${task.taskName}"
        ${isCompleted ? "disabled" : ""}
      >
      <div class="flex-grow">
        <p class="font-medium">${task.taskName}</p>
        <p class="text-sm text-gray-500">${new Date(
          task.dueDate
        ).toLocaleDateString()}</p>
      </div>
      <button class="remove-task-btn text-red-500 hover:underline">Remove</button>
    `;

    // Add event listener to checkbox (only for pending tasks)
    const checkbox = taskElement.querySelector(".task-checkbox");
    if (checkbox) {
      checkbox.addEventListener("change", () =>
        completeTask(task, taskElement, checkbox.checked)
      );
    }

    // Add event listener to remove button
    const removeBtn = taskElement.querySelector(".remove-task-btn");
    removeBtn.addEventListener("click", () => deleteTask(task, taskElement));

    // Append task element to the appropriate list (completed or pending)
    if (isCompleted) {
      completedTaskList.appendChild(taskElement);
    } else {
      taskList.appendChild(taskElement);
    }
  }

  // Complete Task Function
  function completeTask(task, taskElement, isCompleted) {
    // Update task completion status
    fetch("/todo?type=markComplete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName: task.taskName, isCompleted }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Task marked as complete") {
          taskElement.remove();
          completedTasks.push(task);
          updateCompletedTasksUI();
        }
      })
      .catch((err) => console.error("Error completing task:", err));
  }

  // Delete Task Function
  function deleteTask(task, taskElement) {
    // Delete task from the backend
    fetch("/todo?type=delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName: task.taskName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Task deleted successfully") {
          taskElement.remove(); // Remove task from the DOM
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  }

  // Update Completed Tasks UI
  function updateCompletedTasksUI() {
    const tasksToShow = completedTasks.slice(0, 3); // Show first 3 tasks

    completedTaskList.innerHTML = ""; // Clear previous tasks in the list

    tasksToShow.forEach((task) => {
      const completedTaskElement = document.createElement("div");
      completedTaskElement.classList.add(
        "p-2",
        "border",
        "rounded",
        "bg-green-50",
        "flex",
        "items-center",
        "space-x-2"
      );
      completedTaskElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 4.707 7.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
      </svg>
      <div class="flex-grow">
        <p class="font-medium">${task.taskName}</p>
        <p class="text-sm text-gray-500">${new Date(
          task.dueDate
        ).toLocaleDateString()}</p>
      </div>
      <button class="remove-task-btn text-red-500 hover:underline">Remove</button>
    `;
      completedTaskList.appendChild(completedTaskElement);
    });

    // Show or hide "Show More" button
    if (completedTasks.length > 3) {
      showMoreBtn.classList.remove("hidden");
    } else {
      showMoreBtn.classList.add("hidden");
    }
  }

  // Show More Tasks Functionality
  showMoreBtn.addEventListener("click", () => {
    // Show all completed tasks
    completedTaskList.innerHTML = ""; // Clear current view

    completedTasks.forEach((task) => {
      const completedTaskElement = document.createElement("div");
      completedTaskElement.classList.add(
        "p-2",
        "border",
        "rounded",
        "bg-green-50",
        "flex",
        "items-center",
        "space-x-2"
      );
      completedTaskElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 4.707 7.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
      </svg>
      <div class="flex-grow">
        <p class="font-medium">${task.taskName}</p>
        <p class="text-sm text-gray-500">${new Date(
          task.dueDate
        ).toLocaleDateString()}</p>
      </div>
      <button class="remove-task-btn text-red-500 hover:underline">Remove</button>
    `;
      completedTaskList.appendChild(completedTaskElement);
    });

    // Hide "Show More" button after showing all tasks
    showMoreBtn.classList.add("hidden");
  });

  // Event Listeners
  addTaskBtn.addEventListener("click", addTask);
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  // Animate hamburger icon
  const paths = menuBtn.querySelector("svg").querySelectorAll("path");
  paths.forEach((path) => {
    path.classList.toggle("translate-y-1");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});
