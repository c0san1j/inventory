const User = require('../models/userModel');
const { promisfy } = require('util');
const redis = require('redis').createClient({ host: 'redis', port: 6379 });

exports.createNewUser = async (payload) => {
	try {
		const result = await User.create(payload);
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.userLogin = async (email) => {
	try {
		const result = await User.findOne({ email: email });
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.setAccessToken = async (hash, payload, time) => {
	redis.set('test', 1234, 'EX', time, (err) => {
		if (err) {
			console.log(err);
		}
		console.log('saved');
	});
};
//This work too while you await in controller
// exports.createNewUser1 = (payload) => {
// 	return User.create(payload);
// };
