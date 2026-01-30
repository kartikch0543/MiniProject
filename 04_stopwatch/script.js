let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const millisDisplay = document.getElementById('millis');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // First 2 digits

    return {
        main: `${pad(minutes)}:${pad(seconds)}`,
        sub: pad(milliseconds)
    };
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateDisplay() {
    const now = Date.now();
    const time = now - startTime + elapsedTime;
    const formatted = formatTime(time);
    display.innerText = formatted.main;
    millisDisplay.innerText = formatted.sub;
}

function startStop() {
    if (isRunning) {
        // Stop
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        startStopBtn.innerText = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
    } else {
        // Start
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        startStopBtn.innerText = 'Stop';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('stop');
    }
}

function reset() {
    if (isRunning) startStop(); // Stop first if running
    elapsedTime = 0;
    display.innerText = "00:00";
    millisDisplay.innerText = "00";
    lapsList.innerHTML = '';
}

function lap() {
    if (!isRunning && elapsedTime === 0) return;

    const currentTimeMs = isRunning ? (Date.now() - startTime + elapsedTime) : elapsedTime;
    const formatted = formatTime(currentTimeMs);
    const li = document.createElement('li');
    const lapNum = lapsList.children.length + 1;

    li.innerHTML = `<span>Lap ${lapNum}</span> <span>${formatted.main}.${formatted.sub}</span>`;
    lapsList.prepend(li);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
