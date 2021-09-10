const express = require('express');
const router = express.Router();
const Users = require('../model/Users');

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userExists = await Users.findOne({ email, password });
		if (!userExists) {
			return res.status(404).json({
				status: true,
				message: 'Login failed'
			});
		}
		res.status(200).json({
			status: true,
			message: 'Succesfully logged in',
			data: userExists._id
		});
	} catch (err) {}
});

router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await Users.findOne({ email });

		if (userExists) {
			return res.status(404).json({
				status: true,
				message: 'This email address is already registered'
			});
		}

		const newUser = await new Users({
			name,
			email,
			password
		});
		newUser.save();
		res.status(200).json({
			status: true,
			message: 'Succesfully Registered',
			data: newUser._id
		});
	} catch (err) {
		res.status(500).json({
			status: false,
			message: err.message || 'Something went wrong'
		});
	}
});

router.get('/userData/:id', async (req, res) => {
	try {
		const userId = req.params.id;

		const userData = await Users.findOne({ _id: userId });

		const data = userData.toObject();
		delete data.password;
		delete data.createdAt;
		delete data.updatedAt;

		res
			.status(200)
			.json({ status: true, message: 'User data fetched succesfully', data });
	} catch (err) {
		res.status(500).json({
			status: false,
			message: err.message || 'Something went wrong'
		});
	}
});

module.exports = router;
