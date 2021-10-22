const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
	model: {
		type: String,
		required: [true, 'Please enter the model name'],
	},
	status: {
		type: String,
		required: [true, 'Please enter the status of item'],
	},
	serial: {
		type: String,
		required: [true, 'Please enter the serial number'],
	},
	siteFrom: {
		type: String,
		// required: [true, 'Please enter a password'],
	},
	siteTo: {
		type: String,
		// required: [true, 'Please enter a password'],
	},
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
