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
	Student.find({}, function(err,docs) {
		const students = docs.map(function(x) {return x._id})
		Time.find({}, async function(err, docs) {
			const time = docs.map(function(x) {return x._id})

			let z = [];
			let a = 0;
			time.forEach(async function(session) {
				let randStudents = students;
				randStudents.sort(function(a, b) { return 0.5 - Math.random() })
				await Lesson.find({ time: session }, function(err, docs) {
					let lessons = docs.map(function(x) { return x._id });
					let i = 0;
					for (var lesson of lessons) {
						for (var j = 0; j < 22; j++) {
							let attendance = new Attendance({
								student: randStudents[i + j],
								lesson: lesson
							});
							a += 1;
							console.log(a)
							z.push(attendance);
							if (a > 273239) {
								Attendance.insertMany(z, function(err, docs) {
									console.log(err, docs)
								})
							}
						}
						i += 22
					}
				})
			});
		});
	});

	res.send("OK")
});

router.use('/auth', require('./auth')); 
router.use('/users', require('./users'));

module.exports = router;