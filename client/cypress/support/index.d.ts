interface UserCredentials {
	username: string;
	password: string;
}

interface UserData {
	validUser: {
		admin: UserCredentials;
		cs: UserCredentials;
		regularUser: UserCredentials;
	};
	invalidUser: {
		usernameCorrectPasswordIncorrect: UserCredentials;
		usernameIncorrectPasswordCorrect: UserCredentials;
		usernameIncorrectPasswordIncorrect: UserCredentials;
		invalidEmail: UserCredentials;
		invalidPassword: UserCredentials;
		emptyUsername: UserCredentials;
		emptyPassword: UserCredentials;
		emptyUsernameAndPassword: UserCredentials;
	};
}
