const Inventory = require('../models/inventoryModel');
// const { promisfy } = require('util');
// const redis = require('redis').createClient({ host: 'redis', port: 6379 });

exports.addToVan = async (payload) => {
	try {
		const result = await Inventory.create(payload);
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.getVan = async (payload) => {
	try {
		const result = await Inventory.find({});
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.getOneVan = async (payload) => {
	try {
		const result = await Inventory.findOne({ serial: payload });
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.delVan = async (id) => {
	try {
		const result = await Inventory.findByIdAndDelete(id);
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

exports.userLogin = async (email) => {
	try {
		const result = await Inventory.findOne({ email: email });
		return { status: 'success', result: result };
	} catch (err) {
		return { status: 'failed', error: err.message };
		// return err.message;
	}
};

// exports.setAccessToken = async (hash, payload, time) => {
// 	redis.set('test', 1234, 'EX', time, (err) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		console.log('saved');
// 	});
// };
