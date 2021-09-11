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

// const LOCAL_DB_URL = 'mongodb://localhost/Arnowa';
const DB_URL =
	'mongodb+srv://vishakh:vishakhPass@cluster0.sbifl.mongodb.net/cluster0?retryWrites=true&w=majority';

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
app.listen(process.env.PORT || SERVER_PORT, () =>
	console.log('Server is running on port:', SERVER_PORT)
);
