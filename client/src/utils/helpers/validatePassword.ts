// Password validation: Must be 8+ chars, 1 number, 1 lowercase, 1 uppercase, 1 special char

export const validatePassword = (password: string): boolean => {
	if (!password || password.length < 8) {
		return false;
	}

	if (!/[A-Z]/.test(password)) {
		return false;
	}

	if (!/[a-z]/.test(password)) {
		return false;
	}

	if (!/[0-9]/.test(password)) {
		return false;
	}

	if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
		return false;
	}

	return true;
};
