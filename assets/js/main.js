'use strict';

// Swiper.Js initialization
{
	const cubicSwiperSliderConfig = {
		speed: 550,
		keyboard: { enabled: true },
		hashNavigation: true,
		effect: 'cube',
		cubeEffect: { shadow: true, slideShadows: true, shadowOffset: 12.5, shadowScale: 1 },
		on: {
			init() {
				// remove all Swiper.js slider bullets form the tabindex flow
				const bullets = document.querySelectorAll('.swiper-pagination-bullet');
				bullets.forEach(bullet => bullet.setAttribute('tabindex', '-1'));
			},
		},
		pagination: {
			el: '.cubic-slider__pagination',
			clickable: true,
			type: 'bullets',
			renderBullet(index, className) {
				let [name, bgColor] = ['', ''];

				switch (index) {
					case 0: {
						name = 'clock';
						bgColor = 'bg-blue';
						break;
					}
					case 1: {
						name = 'stopwatch';
						bgColor = 'bg-yellow';
						break;
					}
					case 2: {
						name = 'countdown';
						bgColor = 'bg-green';
						break;
					}
					default: {
						name = 'unknown slide';
						bgColor = '#0000004d';
						break;
					}
				}

				return /* html */ `<a href="#${name}" class="${className} ${bgColor}">${name}</a>`;
			},
		},
	};

	new Swiper('.cubic-slider', cubicSwiperSliderConfig);
}

// extract hash from URL
const getURLHash = () => location?.hash.toLocaleLowerCase().trim().slice(1);

// dynamically load modules based on URL hash
window.addEventListener('hashchange', () => loadModuleByHash(getURLHash()));

async function loadModuleByHash(hash = getURLHash()) {
	const modulePath = hash ? `./modules/${hash}.mjs` : './modules/clock.mjs';
	const module = await import(modulePath);

	const functionsMap = new Map([
		['clock', clockInitializer],
		['stopwatch', stopwatchInitializer],
		['countdown', countdownInitializer],
	]);

	const initializer = functionsMap.get(hash) || clockInitializer;
	initializer(module);
}
loadModuleByHash();

// clock
function clockInitializer(clock) {
	const secondHand = document.querySelector('#secondHand');
	const minuteHand = document.querySelector('#minuteHand');
	const hourHand = document.querySelector('#hourHand');
	const timeContainer = document.querySelector('#currentTime');
	const dateContainer = document.querySelector('#currentDate');

	clock.updateClockPanel({ secondHand, minuteHand, hourHand }, { timeContainer, dateContainer });
}

// stopwatch
function stopwatchInitializer(stopwatch) {
	const timerContainer = document.querySelector('#stopwatchTimerContainer');
	const controlBtn = document.querySelector('#stopwatchControlBtn');
	const resetBtn = document.querySelector('#stopwatchResetBtn');

	controlBtn.addEventListener('click', () => stopwatch.stopwatchController(timerContainer, controlBtn, resetBtn));

	resetBtn.addEventListener('click', () => stopwatch.resetStopwatch(timerContainer, controlBtn, resetBtn));
}

// countdown timer
function countdownInitializer(countdown) {
	const timerContainer = document.querySelector('#countdownTimerContainer');
	const timerForm = document.querySelector('#countdownTimerForm');
	const minutesInput = document.querySelector('#countdownInput');
	const resetBtn = document.querySelector('#countdownResetBtn');
	const controlBtn = document.querySelector('#countdownControlBtn');

	timerForm.addEventListener('submit', event => {
		event.preventDefault();

		minutesInput.setAttribute('disabled', true);
		countdown.countdownController(timerContainer, minutesInput, controlBtn, resetBtn);
	});

	resetBtn.addEventListener('click', () => {
		minutesInput.removeAttribute('disabled');
		countdown.resetCountdown(timerContainer, minutesInput, controlBtn, resetBtn);
	});
}
