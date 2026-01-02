let timer;
let running = false;
let isWorking = true;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const modeText = document.getElementById("mode");
const historyList = document.getElementById("history");

function updateDisplay() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  timerDisplay.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function startTimer() {
  if (running) return;

  const work = parseInt(document.getElementById("workTime").value);
  const brk = parseInt(document.getElementById("breakTime").value);

  if (!work || !brk) return alert("Enter valid time!");

  if (!timeLeft || timeLeft === 0) {
    timeLeft = isWorking ? work * 60 : brk * 60;
  }

  running = true;

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      if (isWorking) saveTask();
      isWorking = !isWorking;
      modeText.textContent = isWorking ? "Work Time" : "Break Time";
      timeLeft = (isWorking ? work : brk) * 60;
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  isWorking = true;
  timeLeft = document.getElementById("workTime").value * 60;
  modeText.textContent = "Work Time";
  updateDisplay();
}

function saveTask() {
  const task = document.getElementById("task").value;
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = `${task} ✔️`;
  historyList.appendChild(li);

  let history = JSON.parse(localStorage.getItem("tasks")) || [];
  history.push(task);
  localStorage.setItem("tasks", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("tasks")) || [];
  history.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task} ✔️`;
    historyList.appendChild(li);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

loadHistory();
updateDisplay();
