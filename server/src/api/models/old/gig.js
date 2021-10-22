const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		Title: {
			type: String,
			required: [true, 'Please provide a title of your service.'],
		},
		category: {
			type: String,
			required: [true, 'Please select a catergory.'],
		},
		subcategory: {
			type: String,
			required: [true, 'Please select a subcatergory.'],
		},
		tag: [
			{
				type: String,
			},
		],
		metadata: {},
	},
	{ timestamps: true }
);

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;
