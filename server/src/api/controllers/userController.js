const userService = require('../services/userService');
const userValidation = require('../validations/userValidation');
const bcrypt = require('bcryptjs');
const { hash } = require('../helpers/cryptoHelper');

// const User = require('../models/userModel');

// exports.createNewUser = async (payload) => {
// 	try {
// 		return await User.create(payload);
// 	} catch (err) {
// 		return err.message;
// 	}
// };

exports.createUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	// This will check the user input to make sure is clean if not will throw an error of all non-clean input
	const input = await userValidation.createUser(req.body);
	if (!input.isValid) {
		return res.status(400).json({ Error: input.error });
	}
	// Encrypting password
	const hashedPassword = await bcrypt.hash(password, 10);
	// joining object with the new password
	const newPayload = { ...input.clean_Payload, password: hashedPassword };
	// It passed validation and using clean syntax to save data to mongodb
	const newUser = await userService.createNewUser(newPayload);
	// If any error cause during saving to database will be display the error
	if (newUser.status == 'failed') {
		return res.status(400).json({ Error: newUser.error });
	}
	// Create User On Database Result
	res.status(201).json(newUser.result);
};

exports.userLogin = async (req, res) => {
	const { email, password } = req.body;
	// This will check the user input to make sure is clean if not will throw an error of all non-clean input
	const isEmailValid = await userValidation.userLogin(email);
	if (!isEmailValid) {
		return res.status(400).json({ Error: 'Invalid email syntax' });
	}

	// It passed validation and using clean syntax to save data to mongodb
	const login = await userService.userLogin(email);

	// If any error during fetching to database will be display the error
	if (login.status == 'failed') {
		return res.status(400).json({ Error: login.error });
	}

	// Check if account exist on database
	if (!login.result) {
		return res
			.status(404)
			.json({ Error: 'No Account is found under that email address' });
	}

	// check if password match to the hash
	const verify = await bcrypt.compare(password, login.result.password);

	//if password not match throw an error
	if (!verify) return res.status(404).json({ Error: 'Invalid Password' });

	//TODO: PASSWORD MATCH WHAT TO DO? Make a accesstoke? save it to redit?

	await userService.setAccessToken(
		hash,
		JSON.stringify(login.result),
		'EX',
		3000
	);

	res.status(201).json(login.result);
};
