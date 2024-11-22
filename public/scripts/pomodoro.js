class PomodoroTimer {
  constructor() {
    this.timer = document.getElementById("timer");
    this.startBtn = document.getElementById("start-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.modeButtons = document.querySelectorAll(".mode-btn");

    this.times = {
      pomodoro: 45 * 60,
      "short-break": 5 * 60,
      "long-break": 15 * 60,
    };

    this.currentMode = "pomodoro";
    this.timeRemaining = this.times[this.currentMode];
    this.intervalId = null;
    this.isRunning = false;

    this.initEventListeners();
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
    } else {
      this.intervalId = setInterval(() => this.countdown(), 1000);
      this.startBtn.textContent = "Pause";
    }
    this.isRunning = !this.isRunning;
  }

  countdown() {
    if (this.timeRemaining > 0) {
      this.timeRemaining--;
      this.updateDisplay();
    } else {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.startBtn.textContent = "Start";
    }
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.timeRemaining = this.times[this.currentMode];
    this.updateDisplay();
    this.isRunning = false;
    this.startBtn.textContent = "Start";
  }

  changeMode(mode) {
    this.modeButtons.forEach((btn) => {
      btn.classList.remove("bg-blue-700", "bg-green-700", "bg-red-700");
    });

    const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
    selectedBtn.classList.add("bg-blue-700");

    this.currentMode = mode;
    this.timeRemaining = this.times[mode];
    this.updateDisplay();

    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.startBtn.textContent = "Start";
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
