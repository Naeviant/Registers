const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const joi = require('joi');
const auth = require('../middleware/verifyToken');
const admin = require('../middleware/verifyAdmin');
const User = require("../models/UserModel");

const userValidation = joi.object({
	fullName: joi.string().required(),
	username: joi.string().required(),
	password: joi.string().required(),
	admin: joi.boolean().required()
});

router.post('/', auth, admin, (req, res) => {
	const validation = userValidation.validate(req.body);
	if (validation.error) {
		res.status(400).json({
			code: 400,
			status: "Bad Request",
			message: "Missing Fields",
			data: []
		});
	}
	else {
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
					admin: req.body.admin
				});
				newUser.save((err) => {
					if (err) {
						if (err.code === 11000) {
							res.status(400).json({
								code: 400,
								status: "Bad Request",
								message: "Username In Use",
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
	}
});

router.delete('/:id', auth, (req, res) => {
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