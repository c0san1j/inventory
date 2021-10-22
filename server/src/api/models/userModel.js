const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		// required: [true, 'Please enter your first name'],
	},
	lastName: {
		type: String,
		// required: [true, 'Please enter your last name'],
	},
	email: {
		type: String,
		// required: [true, 'Please enter your email address.'],
	},
	password: {
		type: String,
		// required: [true, 'Please enter a password'],
	},
});

const User = mongoose.model('User', userSchema);
module.exports = User;
