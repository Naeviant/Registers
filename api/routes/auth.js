const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

const loginValidation = joi.object({
	username: joi.string().required(),
	password: joi.string().required()
});

router.post('/', (req, res) => {
	const validation = loginValidation.validate(req.body);
	if (validation.error) {
		res.status(400).json({
			code: 400,
			status: "Bad Request",
			message: "Missing Fields",
			data: []
		});
	}
	else {
		User.findOne({ username: req.body.username }, (err, doc) => {
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
					bcrypt.compare(req.body.password, doc.password, (err, valid) => {
						if (err) {
							// Do Not Send 500 Code as That Indicates Valid Email
							console.err(err);
							res.status(401).json({
								code: 401,
								status: "Unauthorized",
								message: "Invalid Credentials",
								data: []
							});
						}
						else {
							if (valid) {
								const token = jwt.sign({ id: doc._id, fullName: doc.fullName, username: doc.username, admin: doc.admin }, process.env.TOKEN_SECRET);
								res.header('authToken', token);
								res.status(200).json({
									code: 200,
									status: "OK",
									message: "Login Successful",
									data: [{
										id: doc._id,
										fullName: doc.fullName,
										username: doc.username,
										token: token
									}]
								});
							}
							else {
								res.status(401).json({
									code: 401,
									status: "Unauthorized",
									message: "Invalid Credentials",
									data: []
								});		
							}
						}
					});
				}
				else {
					res.status(401).json({
						code: 401,
						status: "Unauthorized",
						message: "Invalid Credentials",
						data: []
					});
				}
			}
		});
	}
});

router.delete('/:id', (req, res) => {

});

module.exports = router;