let stopwatchInterval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

function stopwatchOperator(timerContainer) {
	milliseconds += 10;
	seconds += Math.floor(milliseconds / 100);
	minutes += Math.floor(seconds / 60);
	milliseconds %= 100;
	seconds %= 60;
	minutes %= 60;

	const formatTimeComponent = timeComponent => timeComponent.toString().padStart(2, '0');
	const formattedTime = [minutes, seconds, milliseconds].map(formatTimeComponent).join(' : ');
	timerContainer.textContent = formattedTime;
}

export function stopwatchController(timerContainer, controlBtn, resetBtn) {
	const controlBtnState = controlBtn.textContent.trim().toLowerCase();

	if (controlBtnState === 'start') {
		stopwatchInterval = setInterval(() => stopwatchOperator(timerContainer), 100);

		// display the reset button
		resetBtn.classList.remove('hidden');

		// change the state of the 'controlBtn'
		controlBtn.textContent = 'stop';
	} else {
		// stop the timer counter
		clearInterval(stopwatchInterval);

		// change the state of the 'controlBtn'
		controlBtn.textContent = 'start';
	}
}

export function resetStopwatch(timerContainer, controlBtn, resetBtn) {
	// stop and reset the timer counter
	clearInterval(stopwatchInterval);
	milliseconds = seconds = minutes = 0;

	// reset the content of the 'timerContainer'
	timerContainer.textContent = '00 : 00 : 00';

	// hide the reset button
	resetBtn.classList.add('hidden');

	// change the state of the 'controlBtn'
	controlBtn.textContent = 'start';
}
