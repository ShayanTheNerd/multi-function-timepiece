// Swiper.Js
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    speed: 750,

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

    effect: "cube",
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 15,
        shadowScale: 1,
    },

    keyboard: {
        enabled: true,
    },
});

// Detect mobile device
if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    const portrait = window.matchMedia("(orientation: landscape)");

    // listen for device rotation
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

/* Clock */
const secondHand = document.getElementById('secHand');
const minsHand = document.getElementById('minHand');
const hourHand = document.getElementById('hourHand');

function setRealClockDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();
    const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    document.getElementById('yearOfDate').textContent = now.getFullYear();

    document.getElementById('todaysFullDate').textContent = `${weekdays[now.getDay() + 1]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    if (seconds < 10) {
        document.getElementById('timeOfDay').textContent = `${hour} : ${mins} : 0${seconds}`;
    } else if (mins < 10) {
        document.getElementById('timeOfDay').textContent = `${hour} : 0${mins} : ${seconds}`;
    } else if (hour < 10) {
        document.getElementById('timeOfDay').textContent = `0${hour} : ${mins} : ${seconds}`;
    } else if (hour < 10 && mins < 10) {
        document.getElementById('timeOfDay').textContent = `0${hour} : 0${mins} : ${seconds}`;
    } else if (hour < 10 && seconds < 10) {
        document.getElementById('timeOfDay').textContent = `0${hour} : ${mins} : 0${seconds}`;
    } else if (mins < 10 && seconds < 10) {
        document.getElementById('timeOfDay').textContent = `${hour} : 0${mins} : 0${seconds}`;
    } else if (hour < 10 && mins < 10 && seconds < 10) {
        document.getElementById('timeOfDay').textContent = `0${hour} : 0${mins} : 0${seconds}`;
    }
    else {
        document.getElementById('timeOfDay').textContent = `${hour} : ${mins} : ${seconds}`;
    }

    if (hour < 12) {
        document.getElementById('middayState').textContent = 'AM';
    } else {
        document.getElementById('middayState').textContent = 'PM';
    }
}
setInterval(setRealClockDate, 1);

/* Stopwatch */
let ms, s, m;
ms = s = m = 0;
document.getElementById('stopwatchTime').textContent = `0${m} : 0${s} : 0${ms}`;

function stopwatchCtrl(state) {
    if (state === 'start') {
        window.stopwatchInterval = setInterval(stopwatch, 10);
    } else if (state === 'stop') {
        clearInterval(window.stopwatchInterval);
    } else if (state === 'reset') {
        clearInterval(window.stopwatchInterval);
    }
}

function stopwatch() {
    if (ms < 10) {
        document.getElementById('stopwatchTime').textContent = `${m} : ${s} : 0${ms}`;
    }
    if (s < 10) {
        document.getElementById('stopwatchTime').textContent = `${m} : 0${s} : ${ms}`;
    }
    if (m < 10) {
        document.getElementById('stopwatchTime').textContent = `0${m} : ${s} : ${ms}`;
    }
    if (s < 10 && m < 10) {
        document.getElementById('stopwatchTime').textContent = `0${m} : 0${s} : ${ms}`;
    }
    if (s < 10 && ms < 10) {
        document.getElementById('stopwatchTime').textContent = `${m} : 0${s} : 0${ms}`;
    }
    if (ms < 10 && m < 10) {
        document.getElementById('stopwatchTime').textContent = `0${m} : ${s} : 0${ms}`;
    }
    if (ms < 10 && m < 10 && ms < 10) {
        document.getElementById('stopwatchTime').textContent = `0${m} : 0${s} : 0${ms}`;
    }

    ms++;

    if (ms === 100) {
        ms = 0;
        s++;

        document.getElementById('stopwatchTime').textContent = `${m} : ${s} : ${ms}`;

        if (s < 10) {
            document.getElementById('stopwatchTime').textContent = `${m} : 0${s} : ${ms}`;
        }
    }

    if (s === 60) {
        s = 0;
        m++;

        document.getElementById('stopwatchTime').textContent = `${m} : ${s} : ${ms}`;

        if (m < 10) {
            document.getElementById('stopwatchTime').textContent = `0${m} : ${s} : ${ms}`;
        }
    }
}

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

document.getElementById('stopwatchResetBtn').addEventListener('click', function () {
    this.classList.add('hidden');
    document.getElementById('stopwatchMainBtn').textContent = 'Start';
    stopwatchCtrl('reset');
    ms = s = m = 0;
    document.getElementById('stopwatchTime').textContent = `0${m} : 0${s} : 0${ms}`;
});

/* Countdown timer */
const countdownInput = document.getElementById('countdownInput');
const pattern = /^(0|([1-9]\d*))$/;

document.getElementById('countdownMainBtn').addEventListener('click', function () {
    if (countdownInput.value > 60 || countdownInput.value <= 0 || !pattern.test(countdownInput.value)) {
        alert('Please enter a natural number between 1 and 60');
    } else {
        dm = Number(countdownInput.value);
        this.classList.add('hidden');
        document.getElementById('countdownResetBtn').classList.remove('hidden');
        countdownCtrl('start');
    }
});

document.getElementById('countdownResetBtn').addEventListener('click', function () {
    countdownInput.value = '';
    document.getElementById('countdownMainBtn').classList.remove('hidden');
    this.classList.add('hidden');
    countdownCtrl('reset');
});

let dm, ds;
ds = 0;
dm = 0;
document.getElementById('countdownTime').textContent = `0${dm} : 0${ds}`;
function countdown() {
    document.getElementById('countdownTime').textContent = `${dm} : ${ds}`;

    if (ds < 10) {
        document.getElementById('countdownTime').textContent = `${dm} : 0${ds}`;
    }
    if (dm < 10) {
        document.getElementById('countdownTime').textContent = `0${dm} : ${ds}`;
    }
    if (ds < 10 && dm < 10) {
        document.getElementById('countdownTime').textContent = `0${dm} : 0${ds}`;
    }

    if (ds === 0 && dm === 0) {
        setTimeout(() => {
            alert('Countdown finished!');
        }, 1000);
        clearInterval(window.countdownInterval);
    }

    if (ds === 0) {
        ds = 60;
        dm--;
    }
    ds--;
}

function countdownCtrl(state) {
    if (state === 'start') {
        window.countdownInterval = setInterval(countdown, 1000);
    } else if (state === 'reset') {
        clearInterval(window.countdownInterval);
        dm = ds = 0;
        document.getElementById('countdownTime').textContent = `0${dm} : 0${ds}`;
    }
}