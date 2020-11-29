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

});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;