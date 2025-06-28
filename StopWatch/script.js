let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let savedTime = 0;

const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');

function updateDisplay(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}`;
}

function toggleStartStop() {
  if (!running) {
    startTime = new Date().getTime() - savedTime;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 1000);
    running = true;
    startBtn.textContent = 'Stop';
    startBtn.classList.remove('green-btn');
    startBtn.classList.add('red-btn');
    lapBtn.textContent = 'Lap';
    lapBtn.onclick = lap;
  } else {
    clearInterval(timerInterval);
    savedTime = difference;
    running = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('red-btn');
    startBtn.classList.add('green-btn');
    lapBtn.textContent = 'Restart';
    lapBtn.onclick = reset;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = null;
  updatedTime = null;
  difference = 0;
  savedTime = 0;
  running = false;
  document.getElementById('display').textContent = "00:00:00";
  document.getElementById('laps').innerHTML = '';
  startBtn.textContent = 'Start';
  startBtn.classList.remove('red-btn');
  startBtn.classList.add('green-btn');
  lapBtn.textContent = 'Lap';
  lapBtn.onclick = lap;
}

function lap() {
  if (running) {
    const lapTime = document.createElement('li');
    lapTime.textContent = document.getElementById('display').textContent;
    document.getElementById('laps').appendChild(lapTime);
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggle').checked = isDark;
}

window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').checked = true;
  }
};
