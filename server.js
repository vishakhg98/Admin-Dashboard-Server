const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_URL = 'mongodb://localhost/Arnowa';
mongoose.connect(
	DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log('DB connected');
	}
);

const userRouter = require('./routes/users.js');
app.use('/', userRouter);

const SERVER_PORT = 9000;
app.listen(SERVER_PORT, () =>
	console.log('Server is running on port:', SERVER_PORT)
);
