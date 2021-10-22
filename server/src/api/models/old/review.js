const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
			required: [true, 'Please provide a brief review with your seller.'],
		},
		industry: {
			type: String,
		},
		country: {
			type: String,
			required: [true, 'Title is required.'],
		},
		rating: {
			type: Number,
			required: [true, 'Please provide a rating from 1 to 5 stars.'],
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		dislikes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
