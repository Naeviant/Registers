const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');

router.get('/', (req, res) => {
	res.json({
		code: 200,
		status: "OK",
		message: "API Online",
		data: []
	});
});

router.get('/me', auth, (req, res) => {
	res.json({
		code: 200,
		status: "OK",
		message: "Authentication Successful",
		data: [
			req.user
		]
	});
});

const faker = require("faker");
const User = require("../models/UserModel")
const Student = require("../models/StudentModel")
const Lesson = require("../models/LessonModel")
const Time = require("../models/TimeModel")
const Attendance = require("../models/AttendanceModel")
router.get('/data', (req, res) => {
	Time.find({}, async (err, docs) => {
		const times = docs.map(function(x) { return x._id; });
		User.find({}, (err, docs) => {
			const staff = docs.map(function(x) { return x._id; });
			var data = [];
			for (var time of times) {
				var a = Math.floor(Math.random() * 10);
				while (true) {
					var b = Math.floor(Math.random() * 10);
					if (a != b) {
						break;
					}
				}
				for (var i in staff) {
					if (i == a || i == b) {
						continue;
					}
					data.push({
						name: faker.random.word(),
						time: time,
						teacher: staff[i]
					})
				}
			}
			res.send(data)
		});
	});
});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;