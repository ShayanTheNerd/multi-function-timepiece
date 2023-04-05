let countdownInterval = undefined;
let seconds = 0;
let minutes = null;

function countdownOperator(timerContainer, controlBtn) {
	const [sec, min] = [seconds, minutes].map(item => item.toString().padStart(2, '0')); // formatted timer components
	timerContainer.textContent = `${min} : ${sec}`;

	seconds--;

	if (seconds <= 0) {
		seconds = 59;
		minutes--;
	}

	if (minutes < 0) {
		setTimeout(() => {
			clearInterval(countdownInterval);
			seconds = minutes = 0;
			controlBtn.classList.add('hidden');
			timerContainer.textContent = 'finished!';
		}, 500);
	}
}

export function countdownController(timerContainer, minutesInput, controlBtn, resetBtn) {
	minutes ??= minutesInput.value;

	const controlBtnState = controlBtn.textContent.trim().toLowerCase();

	if (controlBtnState === 'start') {
		if (timerContainer.textContent === '00 : 00') countdownOperator(timerContainer); // pre-call it only the first time
		countdownInterval = setInterval(() => countdownOperator(timerContainer, controlBtn), 999);

		// display the reset button
		resetBtn.classList.remove('hidden');

		// change the state of the 'controlBtn'
		controlBtn.textContent = 'stop';
	} else {
		// stop the timer counter
		clearInterval(countdownInterval);

		// change the state of the 'controlBtn'
		controlBtn.textContent = 'start';
	}
}

export function resetCountdown(timerContainer, minutesInput, controlBtn, resetBtn) {
	// stop and reset the timer counter
	clearInterval(countdownInterval);
	seconds = 0;
	minutes = null;

	// reset the content of the 'timerContainer'
	timerContainer.textContent = '00 : 00';

	// hide the reset button
	resetBtn.classList.add('hidden');

	// show the control button
	controlBtn.classList.remove('hidden');

	// change the state of the 'controlBtn'
	controlBtn.textContent = 'start';

	// reset and focus back on the 'minuteInput'
	minutesInput.textContent = '';
	minutesInput.focus();
}
