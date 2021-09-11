const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST'],
		credentials: true
	})
);

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

app.use(express.json());
const userRouter = require('./routes/users.js');
app.use('/', userRouter);
app.use('/', (req, res) => res.send('YO WORKING BOI'));

const SERVER_PORT = 9000;
app.listen(SERVER_PORT, () =>
	console.log('Server is running on port:', SERVER_PORT)
);
