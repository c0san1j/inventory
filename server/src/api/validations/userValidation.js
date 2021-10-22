const cleanInput = (input) => {
	if (!input) return 0;
	return input.trim();
};

const countInput = (input) => {
	if (!input) return 0;
	// if (input == undefined) return 0;
	return input.length;
};

const regexInput = (regex, input) => {
	return regex.test(input);
};

const isEmailValid = (email) => {
	return regexInput(/^(?=.*[@])(?=.*[.])[A-Za-z\d@.]/, email);
};

exports.createUser = async (check) => {
	const { firstName, lastName, email, password } = check;

	const firstName_CleanInput = cleanInput(firstName);
	const firstName_Count = countInput(firstName_CleanInput);
	const firstName_Result = regexInput(/[0-9\W]/g, firstName_CleanInput);

	const lastName_CleanInput = cleanInput(lastName);
	const lastName_Count = countInput(lastName_CleanInput);
	const lastName_Result = regexInput(/[0-9\W]/g, lastName_CleanInput);

	const email_CleanInput = cleanInput(email);
	const email_Count = countInput(email_CleanInput);
	const email_Result = isEmailValid(email_CleanInput);

	const password_Count = countInput(password);
	const password_Result = regexInput(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		password
	);

	const error = [];
	if (firstName_Count == 0 || firstName_Count == undefined) {
		error.push("First Name can't be blank");
	}
	if (firstName_Result) {
		error.push('No number or special symbol is allow in firstname');
	}

	if (lastName_Count == 0 || lastName_Count == undefined) {
		error.push("Last Name can't be blank");
	}

	if (lastName_Result) {
		error.push('No number or special symbol is allow in lastname');
	}

	if (email_Count == 0 || email_Count == undefined) {
		error.push("Email can't be blank");
	}

	if (!email_Result) {
		error.push('Please type a valid email address');
	}

	if (password_Count == 0) {
		error.push("Password can't be blank");
	}

	if (!password_Result) {
		error.push(
			'Password need to be minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
		);
	}

	// check if any error is on array if so then mark isValid as false
	if (error.length > 0) {
		return { isValid: false, error };
	}

	// encrypting password and make a hash

	// cleaning all input
	const clean_Payload = {
		firstName: firstName_CleanInput,
		lastName: lastName_CleanInput,
		email: email_CleanInput,
	};

	return { isValid: true, clean_Payload };
};

exports.userLogin = (email) => {
	return isEmailValid(email);
};
