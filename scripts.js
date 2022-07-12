// Swiper.Js
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    speed: 750,
    keyboard: {
        enabled: true,
    },
    effect: "cube",
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 15,
        shadowScale: 1,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
            let name, bgColor;
            if (index === 0) {
                name = 'Clock';
                bgColor = 'pagination-clock-bg';
            } else if (index === 1) {
                name = 'Stopwatch';
                bgColor = 'pagination-stopwatch-bg';
            } else if (index === 2) {
                name = 'Countdown';
                bgColor = 'pagination-countdown-bg';
            }
            return `<span class=" ${className} ${bgColor} ">${name} </span>`;
        },
    },
});



// Detect mobile device
if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    const portrait = window.matchMedia("(orientation: landscape)");

    // Listen for device rotation
    portrait.addEventListener("change", (event) => {
        if (event.matches) {
            document.body.classList.add('overflow-hidden');
            document.getElementById('landscapeAlert').classList.replace('hidden', 'flex');
        } else {
            document.body.classList.remove('overflow-hidden');
            document.getElementById('landscapeAlert').classList.replace('flex', 'hidden');
        }
    });
}



// Clock
const secondHand = document.getElementById('secHand');
const minsHand = document.getElementById('minHand');
const hourHand = document.getElementById('hourHand');

function setRealClockDate() {
    // Declare all variables
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();
    const todaysFullTime = document.getElementById('timeOfDay');
    const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    // Set the current year in the 'Credits' section
    document.getElementById('yearOfDate').textContent = now.getFullYear();

    // Set AM/PM
    if (hour < 12) {
        document.getElementById('middayState').textContent = 'AM';
    } else {
        document.getElementById('middayState').textContent = 'PM';
    }

    // Display current full-date on 'Clock' section
    document.getElementById('todaysFullDate').textContent = `${weekdays[now.getDay() + 1]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // Display current full-time on 'Clock' section and handle zeros
    if (seconds < 10) {
        todaysFullTime.textContent = `${hour} : ${mins} : 0${seconds}`;
    } else if (mins < 10) {
        todaysFullTime.textContent = `${hour} : 0${mins} : ${seconds}`;
    } else if (hour < 10) {
        todaysFullTime.textContent = `0${hour} : ${mins} : ${seconds}`;
    } else if (hour < 10 && mins < 10) {
        todaysFullTime.textContent = `0${hour} : 0${mins} : ${seconds}`;
    } else if (hour < 10 && seconds < 10) {
        todaysFullTime.textContent = `0${hour} : ${mins} : 0${seconds}`;
    } else if (mins < 10 && seconds < 10) {
        todaysFullTime.textContent = `${hour} : 0${mins} : 0${seconds}`;
    } else if (hour < 10 && mins < 10 && seconds < 10) {
        todaysFullTime.textContent = `0${hour} : 0${mins} : 0${seconds}`;
    }
    else {
        document.getElementById('timeOfDay').textContent = `${hour} : ${mins} : ${seconds}`;
    }
}
setInterval(setRealClockDate, 1);



// Stopwatch
const stopwatchTime = document.getElementById('stopwatchTime');
let ms, s, m;
ms = s = m = 0;

stopwatchTime.textContent = `0${m} : 0${s} : 0${ms}`;

// Stopwatch controller
function stopwatchCtrl(state) {
    if (state === 'start') {
        window.stopwatchInterval = setInterval(stopwatch, 10);
    } else if (state === 'stop') {
        clearInterval(window.stopwatchInterval);
    } else if (state === 'reset') {
        clearInterval(window.stopwatchInterval);
    }
}

// Stopwatch functionality
function stopwatch() {
    // Handle zeros
    if (ms < 10) {
        stopwatchTime.textContent = `${m} : ${s} : 0${ms}`;
    }
    if (s < 10) {
        stopwatchTime.textContent = `${m} : 0${s} : ${ms}`;
    }
    if (m < 10) {
        stopwatchTime.textContent = `0${m} : ${s} : ${ms}`;
    }
    if (s < 10 && m < 10) {
        stopwatchTime.textContent = `0${m} : 0${s} : ${ms}`;
    }
    if (s < 10 && ms < 10) {
        stopwatchTime.textContent = `${m} : 0${s} : 0${ms}`;
    }
    if (ms < 10 && m < 10) {
        stopwatchTime.textContent = `0${m} : ${s} : 0${ms}`;
    }
    if (ms < 10 && m < 10 && ms < 10) {
        stopwatchTime.textContent = `0${m} : 0${s} : 0${ms}`;
    }

    ms++;

    // Handle seconds
    if (ms === 100) {
        ms = 0;
        s++;

        if (s < 10) {
            document.getElementById('stopwatchTime').textContent = `${m} : 0${s} : ${ms}`;
        } else {
            document.getElementById('stopwatchTime').textContent = `${m} : ${s} : ${ms}`;
        }
    }

    // Handle minuts
    if (s === 60) {
        s = 0;
        m++;

        if (m < 10) {
            document.getElementById('stopwatchTime').textContent = `0${m} : ${s} : ${ms}`;
        } else {
            document.getElementById('stopwatchTime').textContent = `${m} : ${s} : ${ms}`;
        }
    }
}

// Stopwatch main button
document.getElementById('stopwatchMainBtn').addEventListener('click', function () {
    document.getElementById('stopwatchResetBtn').classList.remove('hidden');

    if (this.textContent === 'Stop') {
        this.textContent = 'Start';
        stopwatchCtrl('stop');
    } else {
        this.textContent = 'Stop';
        stopwatchCtrl('start');
    }
});

// Stopwatch reset button
document.getElementById('stopwatchResetBtn').addEventListener('click', function () {
    this.classList.add('hidden');
    document.getElementById('stopwatchMainBtn').textContent = 'Start';
    stopwatchCtrl('reset');
    ms = s = m = 0;
    document.getElementById('stopwatchTime').textContent = `0${m} : 0${s} : 0${ms}`;
});



// Countdown timer
const countdownInput = document.getElementById('countdownInput');
const minutsCorrectPattern = /^(0|([1-9]\d*))$/;

// Countdown timer main button
document.getElementById('countdownMainBtn').addEventListener('click', function () {
    if (countdownInput.value > 60 || countdownInput.value <= 0 || !minutsCorrectPattern.test(countdownInput.value)) {
        alert('Please enter a natural number between 1 and 60');
    } else {
        dm = Number(countdownInput.value);
        this.classList.add('hidden');
        document.getElementById('countdownResetBtn').classList.remove('hidden');
        countdownCtrl('start');
    }
});

// Countdown timer reset button
document.getElementById('countdownResetBtn').addEventListener('click', function () {
    countdownInput.value = '';
    document.getElementById('countdownMainBtn').classList.remove('hidden');
    this.classList.add('hidden');
    countdownCtrl('reset');
});

let dm, ds;
ds = 0;
dm = 0;
const countdownTime = document.getElementById('countdownTime')

countdownTime.textContent = `0${dm} : 0${ds}`;

// Countdown timer functionality
function countdown() {
    countdownTime.textContent = `${dm} : ${ds}`;

    if (ds < 10) {
        countdownTime.textContent = `${dm} : 0${ds}`;
    }
    if (dm < 10) {
        countdownTime.textContent = `0${dm} : ${ds}`;
    }
    if (ds < 10 && dm < 10) {
        countdownTime.textContent = `0${dm} : 0${ds}`;
    }
    if (ds === 0 && dm === 0) {
        setTimeout(() => {
            alert('Countdown finished!');
        }, 1000);
        clearInterval(window.countdownInterval);
    }

    // Handle countdown timer seconds
    if (ds === 0) {
        ds = 60;
        dm--;
    }
    ds--;
}

// Countdown timer controller
function countdownCtrl(state) {
    if (state === 'start') {
        window.countdownInterval = setInterval(countdown, 1000);
    } else if (state === 'reset') {
        clearInterval(window.countdownInterval);
        dm = ds = 0;
        countdownTime.textContent = `0${dm} : 0${ds}`;
    }
}
