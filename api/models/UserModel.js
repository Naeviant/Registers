const mongoose = require('mongoose');

const user = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('User', user)