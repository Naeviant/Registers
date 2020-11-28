const mongoose = require('mongoose');

const time = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	day: {
		type: Number,
		required: true
	},
	week: {
		type: Number,
		required: true
	},
	startTime: {
		type: Number,
		required: true
	},
	endTime: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Time', time)