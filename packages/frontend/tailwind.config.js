module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: null, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				neutral: "var(--neutral)",
				background: "var(--background)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
