const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import { v4 } from 'uuid';

// Create Schema
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		india: {
			type: Number,
			default: Math.floor(Math.random() * (1000 - 0) + 0)
		},
		oman: {
			type: Number,
			default: Math.floor(Math.random() * (1000 - 0) + 0)
		},
		unitedStates: {
			type: Number,
			default: Math.floor(Math.random() * (1000 - 0) + 0)
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = User = mongoose.model('users', UserSchema);
