//Animations
AOS.init();

// Navigation Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const reminderList = document.getElementById("reminderList");
  const completedTaskList = document.getElementById("completedTaskList");

  // Task Class
  class Task {
    constructor(description, date) {
      this.id = Date.now();
      this.description = description;
      this.date = date;
      this.completed = false;
    }
  }

  // Add Task Function
  function addTask() {
    const description = taskInput.value.trim();
    const date = taskDate.value;

    if (description && date) {
      const task = new Task(description, date);
      createTaskElement(task);
      createReminderElement(task);

      // Reset input fields
      taskInput.value = "";
      taskDate.value = "";
    } else {
      alert("Please enter a task description and date");
    }
  }

  // Create Task Element
  function createTaskElement(task) {
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
                    data-id="${task.id}"
                >
                <div class="flex-grow">
                    <p class="font-medium">${task.description}</p>
                    <p class="text-sm text-gray-500">${task.date}</p>
                </div>
            `;

    // Add event listener to checkbox
    const checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => completeTask(task, taskElement));

    taskList.prepend(taskElement);
  }

  // Create Reminder Element
  function createReminderElement(task) {
    const reminderElement = document.createElement("div");
    reminderElement.classList.add("p-2", "border", "rounded", "text-sm");
    reminderElement.innerHTML = `
                <p class="font-medium">${task.description}</p>
                <p class="text-gray-500">Due: ${task.date}</p>
            `;
    reminderList.prepend(reminderElement);
  }

  // Complete Task Function
  function completeTask(task, taskElement) {
    // Remove from task list
    taskElement.remove();

    // Create completed task element
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
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <div>
                    <p class="font-medium">${task.description}</p>
                    <p class="text-sm text-gray-500">Completed on: ${new Date().toLocaleDateString()}</p>
                </div>
            `;

    completedTaskList.prepend(completedTaskElement);
  }

  // Event Listeners
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });
});
