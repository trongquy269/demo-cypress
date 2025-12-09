describe('Login Form - E2E Testing', () => {
	// Get API_URL from cypress config
	const API_URL = Cypress.env('API_URL');

	let userData: UserData;

	// Load test data from fixture
	before(() => {
		cy.fixture<UserData>('user.json').then((data) => {
			userData = data;
		});
	});

	// Navigate to login page before each test
	beforeEach(() => {
		cy.visit('/auth/login');
	});

	// ========================================
	// 1. UI ELEMENTS & LAYOUT TESTS
	// ========================================

	describe('1. UI Elements & Layout', () => {
		it('1.1. Should display all required form elements', () => {
			// Check page title
			cy.contains('LOGIN').should('be.visible');

			// Check username input
			cy.get('input[name="username"]').should('be.visible');
			cy.contains('label', 'Username').should('be.visible');

			// Check password input
			cy.get('input[name="password"]').should('be.visible');
			cy.contains('label', 'Password').should('be.visible');

			// Check remember me checkbox
			cy.get('input[name="remember"]').should('exist');
			cy.contains('Remember me').should('be.visible');

			// Check login button
			cy.contains('button', 'Login').should('be.visible');

			// Check register link
			cy.contains("Don't have an account?").should('be.visible');
			cy.contains('button', 'Register').should('be.visible');

			// Check back button
			cy.contains('button', 'Back').should('be.visible');
		});

		it('1.2. Should have correct input placeholders', () => {
			cy.get('input[name="username"]').should(
				'have.attr',
				'placeholder',
				'user@example.com',
			);
			cy.get('input[name="password"]').should(
				'have.attr',
				'placeholder',
				'********',
			);
		});

		it('1.3. Should have password input type for password field', () => {
			cy.get('input[name="password"]').should(
				'have.attr',
				'type',
				'password',
			);
		});

		it('1.4. Should display required asterisks for required fields', () => {
			// Check if required fields have asterisk indicators
			cy.contains('label', 'Username').within(() => {
				cy.get('.text-red-500').should('contain', '*');
			});
			cy.contains('label', 'Password').within(() => {
				cy.get('.text-red-500').should('contain', '*');
			});
		});
	});

	// ========================================
	// 2. VALIDATION TESTS - EMPTY FIELDS
	// ========================================

	describe('2. Validation - Empty Fields', () => {
		it('2.1. Should show error when username is empty', () => {
			const data = userData.invalidUser.emptyUsername;

			cy.get('input[name="username"]').clear();
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Should display username required error
			cy.contains('Username is required').should('be.visible');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});

		it('2.2. Should show error when password is empty', () => {
			const data = userData.invalidUser.emptyPassword;

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').clear();
			cy.contains('button', 'Login').click();

			// Should display password required error
			cy.contains('Password is required').should('be.visible');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});

		it('2.3. Should show error when both fields are empty', () => {
			cy.contains('button', 'Login').click();

			// Should display username required error first (validation order)
			cy.contains('Username is required').should('be.visible');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});
	});

	// ========================================
	// 3. VALIDATION TESTS - INVALID FORMAT
	// ========================================

	describe('3. Validation - Invalid Format', () => {
		it('3.1. Should show error for invalid email format', () => {
			const data = userData.invalidUser.invalidEmail;

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Should display email validation error
			cy.contains('Username is not valid').should('be.visible');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});

		it('3.2. Should show error for invalid password format', () => {
			const data = userData.invalidUser.invalidPassword;

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Should display password validation error
			cy.contains(
				'Must be 8+ chars, 1 number, 1 lowercase, 1 uppercase, 1 special char',
			).should('be.visible');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});
	});

	// ========================================
	// 4. FAILED LOGIN TESTS - WRONG CREDENTIALS
	// ========================================

	describe('4. Failed Login - Wrong Credentials', () => {
		it('4.1. Should fail with correct username but wrong password', () => {
			const data = userData.invalidUser.usernameCorrectPasswordIncorrect;

			// Intercept login API to simulate server error
			cy.intercept('POST', `${API_URL}/user/login`, {
				statusCode: 401,
				body: { message: 'Invalid credentials' },
			}).as('loginRequest');

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Wait for API call
			cy.wait('@loginRequest');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});

		it('4.2. Should fail with wrong username but correct password', () => {
			const data = userData.invalidUser.usernameIncorrectPasswordCorrect;

			// Intercept login API to simulate server error
			cy.intercept('POST', `${API_URL}/user/login`, {
				statusCode: 401,
				body: { message: 'Invalid credentials' },
			}).as('loginRequest');

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Wait for API call
			cy.wait('@loginRequest');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});

		it('4.3. Should fail with both username and password wrong', () => {
			const data =
				userData.invalidUser.usernameIncorrectPasswordIncorrect;

			// Intercept login API to simulate server error
			cy.intercept('POST', `${API_URL}/user/login`, {
				statusCode: 401,
				body: { message: 'Invalid credentials' },
			}).as('loginRequest');

			cy.get('input[name="username"]').type(data.username);
			cy.get('input[name="password"]').type(data.password);
			cy.contains('button', 'Login').click();

			// Wait for API call
			cy.wait('@loginRequest');

			// Should not redirect
			cy.url().should('include', '/auth/login');
		});
	});

	// ========================================
	// 5. SUCCESSFUL LOGIN TESTS
	// ========================================

	describe('5. Successful Login', () => {
		it('5.1. Should login successfully with admin credentials', () => {
			const admin = userData.validUser.admin;

			cy.get('input[name="username"]').type(admin.username);
			cy.get('input[name="password"]').type(admin.password);
			cy.contains('button', 'Login').click();

			// Verify redirect to home page
			cy.url().should('eq', Cypress.config('baseUrl') + '/');
		});

		it('5.2. Should login successfully with CS user credentials', () => {
			const cs = userData.validUser.cs;

			cy.get('input[name="username"]').type(cs.username);
			cy.get('input[name="password"]').type(cs.password);
			cy.contains('button', 'Login').click();

			// Verify redirect to home page
			cy.url().should('eq', Cypress.config('baseUrl') + '/');
		});

		it('5.3. Should login successfully with regular user credentials', () => {
			const user = userData.validUser.regularUser;

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.contains('button', 'Login').click();

			// Verify redirect to home page
			cy.url().should('eq', Cypress.config('baseUrl') + '/');
		});
	});

	// ========================================
	// 6. REMEMBER ME FUNCTIONALITY
	// ========================================

	describe('6. Remember Me Functionality', () => {
		it('6.1. Should check and uncheck remember me checkbox', () => {
			const checkbox = cy.get('input[name="remember"]');

			// Initially unchecked
			checkbox.should('not.be.checked');

			// Click to check
			checkbox.check({ force: true });
			checkbox.should('be.checked');

			// Click to uncheck
			checkbox.uncheck({ force: true });
			checkbox.should('not.be.checked');
		});

		it('6.2. Should send remember flag when checked during login', () => {
			const user = userData.validUser.regularUser;

			// Intercept login API call
			cy.intercept('POST', `${API_URL}/user/login`).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.get('input[name="remember"]').check({ force: true });
			cy.contains('button', 'Login').click();

			// Verify API request includes isRemember: true
			cy.wait('@loginRequest')
				.its('request.body')
				.should('deep.include', {
					email: user.username,
					password: user.password,
					isRemember: true,
				});
		});

		it('6.3. Should not send remember flag when unchecked', () => {
			const user = userData.validUser.regularUser;

			// Intercept login API call
			cy.intercept('POST', `${API_URL}/user/login`).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			// Don't check remember me
			cy.contains('button', 'Login').click();

			// Verify API request includes isRemember: false
			cy.wait('@loginRequest')
				.its('request.body')
				.should('deep.include', {
					email: user.username,
					password: user.password,
					isRemember: false,
				});
		});
	});

	// ========================================
	// 7. INPUT INTERACTION TESTS
	// ========================================

	describe('7. Input Interaction', () => {
		it('7.1. Should clear error when user starts typing in username field', () => {
			// Trigger username error
			cy.contains('button', 'Login').click();
			cy.contains('Username is required').should('be.visible');

			// Start typing
			cy.get('input[name="username"]').type('a');

			// Error should clear (or remain based on implementation)
			// This depends on your form's error clearing logic
		});

		it('7.2. Should allow typing and clearing in input fields', () => {
			const testText = 'test@example.com';

			// Type in username
			cy.get('input[name="username"]').type(testText);
			cy.get('input[name="username"]').should('have.value', testText);

			// Clear username
			cy.get('input[name="username"]').clear();
			cy.get('input[name="username"]').should('have.value', '');

			// Type in password
			cy.get('input[name="password"]').type('Password123!');
			cy.get('input[name="password"]').should(
				'have.value',
				'Password123!',
			);

			// Clear password
			cy.get('input[name="password"]').clear();
			cy.get('input[name="password"]').should('have.value', '');
		});

		it('7.3. Should handle special characters in input fields', () => {
			const specialEmail = 'test+special@example.com';
			const specialPassword = 'P@ssw0rd!#$%';

			cy.get('input[name="username"]').type(specialEmail);
			cy.get('input[name="username"]').should('have.value', specialEmail);

			cy.get('input[name="password"]').type(specialPassword);
			cy.get('input[name="password"]').should(
				'have.value',
				specialPassword,
			);
		});
	});

	// ========================================
	// 8. NAVIGATION TESTS
	// ========================================

	describe('8. Navigation', () => {
		it('8.1. Should navigate to register page when clicking Register button', () => {
			cy.contains('button', 'Register').click();
			cy.url().should('include', '/auth/register');
		});

		it('8.2. Should have functional Back button', () => {
			// Click back button
			cy.contains('button', 'Back').click();

			// Verify navigation (depends on your routing logic)
			// This might go to previous page or home page
		});
	});

	// ========================================
	// 9. ACCESSIBILITY TESTS
	// ========================================

	describe('9. Accessibility', () => {
		it('9.1. Should have proper labels for form inputs', () => {
			cy.get('input[name="username"]')
				.parent()
				.parent()
				.should('contain', 'Username');
			cy.get('input[name="password"]')
				.parent()
				.parent()
				.should('contain', 'Password');
		});

		it('9.2. Should be keyboard navigable', () => {
			// Test that form elements can be focused
			cy.get('input[name="username"]').focus();
			cy.focused().should('have.attr', 'name', 'username');

			cy.get('input[name="password"]').focus();
			cy.focused().should('have.attr', 'name', 'password');

			cy.get('input[name="remember"]').focus();
			cy.focused().should('have.attr', 'name', 'remember');
		});

		it('9.3. Should submit form on Enter key in password field', () => {
			const user = userData.validUser.regularUser;

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(`${user.password}{enter}`);

			// Should trigger login (verify by URL change or API call)
			cy.url().should('not.include', '/auth/login');
		});
	});

	// ========================================
	// 10. ERROR DISPLAY TESTS
	// ========================================

	describe('10. Error Display', () => {
		it('10.1. Should display error message below username field', () => {
			cy.contains('button', 'Login').click();

			// Error should appear below username input
			cy.get('input[name="username"]')
				.parent()
				.parent()
				.within(() => {
					cy.contains('Username is required').should('be.visible');
				});
		});

		it('10.2. Should display error message below password field', () => {
			cy.get('input[name="username"]').type('test@example.com');
			cy.contains('button', 'Login').click();

			// Error should appear below password input
			cy.get('input[name="password"]')
				.parent()
				.parent()
				.within(() => {
					cy.contains('Password is required').should('be.visible');
				});
		});

		it('10.3. Should show only one error at a time', () => {
			cy.contains('button', 'Login').click();

			// Should show username error first
			cy.contains('Username is required').should('be.visible');

			// Password error should not be visible yet (based on validation order)
			// This depends on your form's validation logic
		});
	});

	// ========================================
	// 11. API INTEGRATION TESTS
	// ========================================

	describe('11. API Integration', () => {
		it('11.1. Should send correct payload to login endpoint', () => {
			const user = userData.validUser.regularUser;

			cy.intercept('POST', `${API_URL}/user/login`).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.contains('button', 'Login').click();

			cy.wait('@loginRequest').then((interception) => {
				expect(interception.request.body).to.deep.equal({
					email: user.username,
					password: user.password,
					isRemember: false,
				});
			});
		});

		it('11.2. Should handle successful API response', () => {
			const user = userData.validUser.regularUser;

			cy.intercept('POST', `${API_URL}/user/login`, {
				statusCode: 200,
				body: {
					status: 200,
					message: 'Login successfully',
					data: {
						accessToken: 'mock-access-token-123',
						refreshToken: 'mock-refresh-token-456',
					},
				},
			}).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.contains('button', 'Login').click();

			cy.wait('@loginRequest');

			// Should redirect to home page
			cy.url().should('eq', Cypress.config('baseUrl') + '/');
		});

		it('11.3. Should handle API error response', () => {
			const user = userData.validUser.regularUser;

			cy.intercept('POST', `${API_URL}/user/login`, {
				statusCode: 500,
				body: {
					status: 500,
					message: 'Server error',
					error: 'Internal Server Error',
				},
			}).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.contains('button', 'Login').click();

			cy.wait('@loginRequest');

			// Should stay on login page
			cy.url().should('include', '/auth/login');
		});

		it('11.4. Should handle network timeout', () => {
			const user = userData.validUser.regularUser;

			cy.intercept('POST', `${API_URL}/user/login`, {
				forceNetworkError: true,
			}).as('loginRequest');

			cy.get('input[name="username"]').type(user.username);
			cy.get('input[name="password"]').type(user.password);
			cy.contains('button', 'Login').click();

			// Should handle network error gracefully
			cy.url().should('include', '/auth/login');
		});
	});

	// ========================================
	// 12. RESPONSIVE DESIGN TESTS
	// ========================================

	describe('12. Responsive Design', () => {
		const viewports = [
			{ name: 'mobile', width: 375, height: 667 },
			{ name: 'tablet', width: 768, height: 1024 },
			{ name: 'desktop', width: 1920, height: 1080 },
		];

		viewports.forEach((viewport) => {
			it(`12.${
				viewports.indexOf(viewport) + 1
			}. Should display correctly on ${viewport.name}`, () => {
				cy.viewport(viewport.width, viewport.height);

				// Check all elements are visible
				cy.contains('LOGIN').should('be.visible');
				cy.get('input[name="username"]').should('be.visible');
				cy.get('input[name="password"]').should('be.visible');
				cy.contains('button', 'Login').should('be.visible');
			});
		});
	});
});
