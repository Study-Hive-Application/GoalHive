// Get DOM elements
const totalTimeInput = document.getElementById("total-time-input");
const focusTimeDisplay = document.getElementById("focus-time");
const timerDisplay = document.getElementById("timer-display");
const progressCircle = document.getElementById("progress-circle");
const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const resetPopup = document.getElementById("reset-popup");
const confirmResetButton = document.getElementById("confirm-reset");
const cancelResetButton = document.getElementById("cancel-reset");
const decreaseFocusButton = document.getElementById("decrease-focus");
const increaseFocusButton = document.getElementById("increase-focus");
const taskInput = document.getElementById("task-input");
const taskTimeInput = document.getElementById("task-time-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Initial variables
let focusTime = 25; // Focus time in minutes
let currentSessionTime = focusTime * 60; // Current session time in seconds
let timerInterval = null;
let isRunning = false;
let focusSessions = 0; // Count of completed focus sessions

// Functions

// Update Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(currentSessionTime / 60);
  const seconds = currentSessionTime % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Update Circle Progress
function updateProgressCircle() {
  const progress = ((focusTime * 60 - currentSessionTime) / (focusTime * 60)) * 282; // Circle circumference: 2 * π * r ≈ 282
  progressCircle.style.strokeDashoffset = 282 - progress;
}

// Start/Pause Timer
function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseButton.textContent = "Start";
  } else {
    timerInterval = setInterval(() => {
      if (currentSessionTime > 0) {
        currentSessionTime--;
        updateTimerDisplay();
        updateProgressCircle();
      } else {
        clearInterval(timerInterval);
        focusSessions++;
        alert("Session completed! Take a break.");
        resetTimer();
      }
    }, 1000);
    startPauseButton.textContent = "Pause";
  }
  isRunning = !isRunning;
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  currentSessionTime = focusTime * 60;
  isRunning = false;
  updateTimerDisplay();
  updateProgressCircle();
  startPauseButton.textContent = "Start";
  focusSessions = 0;
}

// Open Reset Popup
function openResetPopup() {
  resetPopup.classList.remove("hidden");
}

// Close Reset Popup
function closeResetPopup() {
  resetPopup.classList.add("hidden");
}

// Confirm Reset
confirmResetButton.addEventListener("click", () => {
  resetTimer();
  closeResetPopup();
});

// Cancel Reset
cancelResetButton.addEventListener("click", closeResetPopup);

// Increase or Decrease Focus Time
function adjustFocusTime(amount) {
  if (focusTime + amount >= 5 && focusTime + amount <= 90) {
    focusTime += amount;
    currentSessionTime = focusTime * 60;
    focusTimeDisplay.textContent = focusTime;
    updateTimerDisplay();
    updateProgressCircle();
  }
}

decreaseFocusButton.addEventListener("click", () => adjustFocusTime(-1));
increaseFocusButton.addEventListener("click", () => adjustFocusTime(1));

// Add Task to Task List
addTaskButton.addEventListener("click", () => {
  const taskValue = taskInput.value.trim();
  const taskTimeValue = taskTimeInput.value.trim();
  if (taskValue && taskTimeValue) {
    const listItem = document.createElement("li");
    listItem.classList.add("my-1", "text-black");
    listItem.textContent = `${taskValue} - ${taskTimeValue} mins`;
    taskList.appendChild(listItem);
    taskInput.value = ""; // Clear input
    taskTimeInput.value = ""; // Clear input
  }
});

// Event Listeners
startPauseButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", openResetPopup);

// Initial Setup
updateTimerDisplay();
updateProgressCircle();
