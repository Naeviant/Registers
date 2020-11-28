const mongoose = require('mongoose');

const lesson = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	time: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "Time",
		required: true
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "User",
		required: true
	}
});

module.exports = mongoose.model('Lesson', lesson)