const mongoose = require('mongoose');

const attendance = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "Student",
		required: true
	},
	lesson: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "Lesson",
		required: true
	},
	attendance: {
		type: String
	}
});

module.exports = mongoose.model('Attendance', attendance)