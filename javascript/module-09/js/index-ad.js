class Stopwatch {
	constructor(value){
        this.parentNode = value;
        this.minutes = "00";
        this.seconds = "00";
        this.milisec = 0;
        this.delta = 0;
        this.start = 0;
        this.timerActive = false;
        this.lapArray = [];
        this.timerInterval;
        this.timer;
        this.buttonStart;
        this.buttonLap;
        this.buttonReset;
        this.lap;
	}
    
    createElements() {
        this.buttonStart = document.createElement("button");
        this.buttonStart.classList.add("btn");
        this.buttonStart.innerHTML = "Start";

        this.buttonLap = document.createElement("button");
        this.buttonLap.classList.add("btn");
        this.buttonLap.innerHTML = "Lap";

        this.buttonReset = document.createElement("button");
        this.buttonReset.classList.add("btn");
        this.buttonReset.innerHTML = "Reset";
        this.buttonReset.setAttribute("disabled", "true");

        this.timer = document.createElement("div");
        this.timer.classList.add("time");
        this.timer.innerHTML = "00:00.0";

        this.lap = document.createElement("ul");
        this.lap.classList.add("laps");

        this.parentNode.appendChild(this.timer);
        this.parentNode.appendChild(this.buttonStart);
        this.parentNode.appendChild(this.buttonLap);
        this.parentNode.appendChild(this.buttonReset);
        this.parentNode.appendChild(this.lap);
    }
  
	createLapItems() {
        const li = document.createElement("li");
        li.innerHTML = this.minutes + ":" + this.seconds + "." + this.milisec;

        return li;  
    }

	startTimer() {
        this.buttonReset.removeAttribute("disabled");

        if (!this.timerActive) {
            this.start = Date.now() - this.delta;

            this.timerInterval = setInterval(this.createTimer.bind(this), 100);
            this.timerActive = !this.timerActive;
            this.buttonStart.innerHTML = "Pause";
        } else {
            clearInterval(this.timerInterval);
            this.timerActive = !this.timerActive;
            this.buttonStart.innerHTML = "Continue";
        }
	}
	  
	saveTimer() {
        const li = this.createLapItems();
        this.lapArray.push(li);
        this.lapArray.forEach(element => {
            this.lap.appendChild(element);
        });
	}
	  
	resetTimer() {
        clearInterval(this.timerInterval);
        this.timer.innerHTML = "00:00.0";
        this.buttonStart.innerHTML = "Start";
        this.timerActive = false;
        this.minutes = "00";
        this.seconds = "00";
        this.milisec = 0;
        this.delta = 0;
        this.lap.innerHTML = "";
        this.lapArray = [];
        this.buttonReset.setAttribute("disabled", "true");        
	}

	createTimer () {
        this.delta = new Date(Date.now() - this.start);
        this.milisec =  Math.floor(this.delta.getMilliseconds()/100);
        this.seconds =  this.delta.getSeconds();
        this.minutes =  this.delta.getMinutes();

        if (this.seconds < 10 ) this.seconds = "0" + this.seconds;
        if (this.minutes < 10 ) this.minutes = "0" + this.minutes;

        this.timer.innerHTML = this.minutes + ":" + this.seconds + "." + this.milisec;
	}
    
	init() {
        this.createElements();

        this.buttonStart.addEventListener('click', e => this.startTimer(e));
        this.buttonLap.addEventListener('click', e => this.saveTimer(e));
        this.buttonReset.addEventListener('click', e => this.resetTimer(e));
    }
}

const parentA = document.querySelector(".stopwatch-A")
const watchA = new Stopwatch(parentA);
watchA.init();

const parentB = document.querySelector(".stopwatch-B")
const watchB = new Stopwatch(parentB);
watchB.init();