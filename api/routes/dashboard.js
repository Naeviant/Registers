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

		Lesson.find({ time: { "$in": times.map(function(x) { return x._id; }) }, teacher: req.user.id }, (err, docs) => {
			var lessons = docs;
			for (var i in lessons) {
				const ids = times.map(function(x) { return x._id.toString() });
				const time = lessons[i].time.toString();
				lessons[i].time = times[ids.indexOf(time)];
			}
			lessons.sort(function(a, b) {          
			  if (a.time.day === b.time.day) {
			    return a.time.startTime > b.time.startTime ? 1 : -1;
			  }
			  return a.time.day > b.time.day ? 1 : -1;
			});
			res.json(lessons)
		});
	});
});

module.exports = router;