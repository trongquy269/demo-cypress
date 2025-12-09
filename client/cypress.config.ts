import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			config.env.API_URL =
				process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

			return config;
		},
		specPattern: './cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
		baseUrl: 'http://localhost:3000',
	},
});
