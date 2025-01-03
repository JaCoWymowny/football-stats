/** @type {import('tailwindcss').Config} */
import tailwindcssForms from '@tailwindcss/forms';
import tailwindcssTypography from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
	darkMode: ['class'],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		screens: {
			tablet: '640px',
			laptop: '1024px',
			desktop: '1280px'
		},
		extend: {
			colors: {
				primary: '#223564', // Primary Theme background
				secondary: '#E9EFFF', // Secondary Theme Navbar + non-Navbar buttons
				background_light: '#F1F1E6', // Light Theme for components
				accent: '#747687', // NavBar Buttons Theme
				primary_text: '#2F3E49',     // Primary text
				secondary_text: '#f1f1e6',  // Secondary text
				success: '#3FA680',
				warning: '#BD9648',
				danger: '#F44336',
			},
			borderRadius: {
				sm: '4px',
				md: '8px',
				lg: '12px'
			},

		}
	},
	plugins: [
		tailwindcssForms,
		tailwindcssTypography,
		tailwindcssAnimate
	]
};
