export function updateClockPanel(clockNodes = {}, datetimeNodes = {}) {
	const { secondHand, minuteHand, hourHand } = clockNodes;
	const { timeContainer, dateContainer } = datetimeNodes;

	// update current date and time every second
	setInterval(() => {
		const now = new Date();
		const seconds = now.getSeconds();
		const minutes = now.getMinutes();
		const hours = now.getHours();
		const dayNumber = now.getDay();
		const monthNumber = now.getMonth();
		const date = now.getDate();
		const year = now.getFullYear();
		const timeComponents = { seconds, minutes, hours, dayNumber, date, monthNumber, year };

		updateAnalogClock(timeComponents, secondHand, minuteHand, hourHand);
		displayDateAndTime(timeComponents, timeContainer, dateContainer);
	}, 1000);
}

function updateAnalogClock(time = {}, secondHand, minuteHand, hourHand) {
	const { seconds, minutes, hours } = time;
	const secondsDegrees = (seconds / 60) * 360 + 90;
	const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
	const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;

	secondHand.style.rotate = `${secondsDegrees}deg`;
	minuteHand.style.rotate = `${minutesDegrees}deg`;
	hourHand.style.rotate = `${hoursDegrees}deg`;
}

function displayDateAndTime(time = {}, timeContainer, dateContainer) {
	/* prettier-ignore */
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const { seconds, minutes, hours, dayNumber, date, monthNumber, year } = time;
	const today = weekdays[dayNumber + 1];
	const month = months[monthNumber];

	// formatted time components
	const [sec, min, hour, dateString, monthString] = [seconds, minutes, hours, date, monthNumber].map(item =>
		item.toString().padStart(2, '0'),
	);

	// display current time
	timeContainer.textContent = `${hour} : ${min} : ${sec}`;
	timeContainer.setAttribute('datetime', `${hour}:${min}:${sec}`);

	// display current date
	dateContainer.textContent = `${today}, ${month} ${date} ${year}`;
	dateContainer.setAttribute('datetime', `${year}-${monthString}-${dateString}T${hour}:${min}:${sec}`);
}
