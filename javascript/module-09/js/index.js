let minutes = "00";
let seconds = "00";
let milisec = 0;
let delta = 0;
let startTime = 0;
let timerActive = false;
let lapArray = [];
let timerInterval;
 
const timer = document.querySelector(".js-time");
const laps = document.querySelector(".js-laps");
const buttonStart = document.querySelector(".js-start");
const buttonReset = document.querySelector(".js-reset");
const buttonLap = document.querySelector(".js-take-lap");

buttonStart.addEventListener('click', () => {
  buttonReset.disabled = false;
  if (!timerActive) {
    startTime = Date.now() - delta;
    timerInterval = setInterval(startTimer, 100);
    timerActive = !timerActive;
    buttonStart.innerHTML = "Pause";
  } else {
    clearInterval(timerInterval);
    timerActive = !timerActive;
    buttonStart.innerHTML = "Continue";
  }
});

buttonLap.addEventListener('click', () => {
  createLapItems();
  lapArray.forEach(element => {
    laps.appendChild(element);
  });
});

buttonReset.addEventListener('click', () => {
  clearInterval(timerInterval);
  timer.innerHTML = "00:00.0";
  buttonStart.innerHTML = "Start";
  timerActive = false;
  minutes = "00";
  seconds = "00";
  milisec = 0;
  delta = 0;
  laps.innerHTML = "";
  lapArray = [];
  buttonReset.disabled = true;
});

const startTimer = function() {
  delta = new Date(Date.now() - startTime);

  milisec =  Math.floor(delta.getMilliseconds()/100);
  seconds =  delta.getSeconds();
  minutes =  delta.getMinutes();

  if (seconds < 10 ) seconds = "0" + seconds;
  if (minutes < 10 ) minutes = "0" + minutes;

  timer.innerHTML = minutes + ":" + seconds + "." + milisec;
};

const createLapItems = function() {
  const li = document.createElement("li");
  li.innerHTML = minutes + ":" + seconds + "." + milisec;

  return lapArray.push(li);  
};
