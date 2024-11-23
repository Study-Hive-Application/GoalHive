// Toggle menu function for mobile
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

class PomodoroTimer {
  constructor() {
    this.timer = document.getElementById("timer");
    this.startBtn = document.getElementById("start-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.modeButtons = document.querySelectorAll("[data-mode]");

    this.times = {
      pomodoro: 25 * 60,
      "short-break": 5 * 60,
      "long-break": 15 * 60,
    };

    this.currentMode = "pomodoro";
    this.timeRemaining = this.times[this.currentMode];
    this.intervalId = null;
    this.isRunning = false;

    this.initEventListeners();
    this.updateDisplay();
  }

  initEventListeners() {
    this.startBtn.addEventListener("click", () => this.toggleTimer());
    this.resetBtn.addEventListener("click", () => this.resetTimer());

    this.modeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const mode = e.target.getAttribute("data-mode");
        this.changeMode(mode);
      });
    });
  }

  toggleTimer() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.startBtn.textContent = "Start";
      this.startBtn.classList.remove("bg-red-600", "hover:bg-red-700");
      this.startBtn.classList.add("bg-green-600", "hover:bg-green-700");
    } else {
      this.intervalId = setInterval(() => this.countdown(), 1000);
      this.startBtn.textContent = "Pause";
      this.startBtn.classList.remove("bg-green-600", "hover:bg-green-700");
      this.startBtn.classList.add("bg-green-600", "hover:bg-green-700");
    }
    this.isRunning = !this.isRunning;
  }

  countdown() {
    if (this.timeRemaining > 0) {
      this.timeRemaining--;
      this.updateDisplay();
    } else {
      this.playNotification();
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.startBtn.textContent = "Start";
      this.startBtn.classList.remove("bg-green-300", "hover:bg-green-400");
      this.startBtn.classList.add("bg-green-600", "hover:bg-green-700");
    }
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.timeRemaining = this.times[this.currentMode];
    this.updateDisplay();
    this.isRunning = false;
    this.startBtn.textContent = "Start";
    this.startBtn.classList.remove("bg-green-300", "hover:bg-green-400");
    this.startBtn.classList.add("bg-green-600", "hover:bg-green-700");
  }

  changeMode(mode) {
    this.modeButtons.forEach((btn) => {
      const btnMode = btn.getAttribute("data-mode");
      btn.classList.remove(
        "bg-blue-500",
        "bg-green-500",
        "bg-red-500",
        "text-white"
      );
      btn.classList.add(
        `text-${
          btnMode === "pomodoro"
            ? "white"
            : btnMode === "short-break"
            ? "white"
            : "white"
        }-500`
      );
    });

    const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
    selectedBtn.classList.add(
      `bg-${
        mode === "pomodoro" ? "blue" : mode === "short-break" ? "green" : "red"
      }-500`,
      "text-white"
    );

    this.currentMode = mode;
    this.timeRemaining = this.times[mode];
    this.updateDisplay();

    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.startBtn.textContent = "Start";
      this.startBtn.classList.remove("bg-red-600", "hover:bg-red-700");
      this.startBtn.classList.add("bg-green-600", "hover:bg-green-700");
    }
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    this.timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}

new PomodoroTimer();
