/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './assets/js/main.js'],
	theme: {
		extend: {
			screens: {
				support: { raw: '(hover: hover)' }, // check if hover is supported on the device
			},
		},
	},
};
