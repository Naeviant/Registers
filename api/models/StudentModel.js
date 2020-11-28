const mongoose = require('mongoose');

const student = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Student', student)