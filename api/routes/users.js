const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/UserModel.js");

router.post('/', (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if (err) {
			res.status(500).json({
				code: 500,
				status: "Internal Server Error",
				message: "Password Hash Failed",
				data: []
			});
		}
		else {
			const newUser = new User({
				fullName: req.body.fullName,
				username: req.body.username,
				password: hash,
				admin: (req.body.admin == "false")
			});
			newUser.save((err) => {
				if (err) {
					if (err.code === 11000) {
						res.status(400).json({
							code: 400,
							status: "Bad Request",
							message: "Username In Use.",
							data: []
						});
					}
					else {
						res.status(500).json({
							code: 500,
							status: "Internal Server Error",
							message: "Database Connection Failed",
							data: []
						});
					}
				}
				else {
					res.json({
						code: 201,
						status: "Created",
						message: "User Created",
						data: [{
							id: newUser._id,
							fullName: newUser.fullName,
							username: newUser.username
						}]
					});
				}
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, doc) => {
		if (err) {
			res.status(500).json({
				code: 500,
				status: "Internal Server Error",
				message: "Database Connection Failed",
				data: []
			});
		}
		else {
			if (doc) {
				res.status(200).json({
					code: 200,
					status: "OK",
					message: "User Deleted",
					data: []
				});
			}
			else {
				res.status(400).json({
					code: 400,
					status: "Bad Request",
					message: "User Does Not Exist",
					data: []
				});
			}
		}
	});
});

module.exports = router;