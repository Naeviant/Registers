const express = require('express');
const router = express.Router();
const auth = require("../middleware/verifyToken");

const Time = require("../models/TimeModel");
const Lesson = require("../models/LessonModel");

router.get("/", auth, (req, res) => {
	const epoch = new Date(2020, 7, 31, 0, 0, 0);
	const now = new Date();
	const diff = Math.floor((now - epoch) / (7 * 24 * 60 * 60 * 1000));

	let lessons = [];

	Time.find({ week: diff }, async(err, docs) => {
		const times = docs;

		for (var i in times) {
			await Lesson.findOne({ time: times[i]._id, teacher: req.user.id }, (err, docs) => {
				let lesson = docs;
				if (lesson) {
					lesson.time = times[i];
					lessons.push(lesson)
				}
			});
		}

		res.json(lessons)
	});
});

module.exports = router;