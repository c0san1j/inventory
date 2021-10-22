const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	account: {
		fullname: {
			type: String,
			required: [true, 'Please Enter Your Full Name'],
		},
		email: {
			type: String,
			required: [true, 'Please Enter Your Email'],
		},
		Status: {
			type: Number,
			default: 0,
		},
		deactivated: {
			type: Boolean,
			default: false,
		},
		country: {
			type: String,
		},
	},
	avatar: {
		type: String,
	},
	nickname: {
		type: String,
		required: [true, 'Enter a nickname'],
	},

	description: {
		type: String,
	},
	languages: [
		{
			type: String,
		},
	],
	skills: [
		{
			type: String,
		},
	],
	educations: [
		{
			type: String,
		},
	],
	certifications: [
		{
			type: String,
		},
	],
	rating: [{}],
});
