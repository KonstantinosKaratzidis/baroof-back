const mongoose = require("mongoose");
const User = require("./User");

const optionSchema = new mongoose.Schema({
	text: {
		type: String,
		maxLength: 75
	},
	isCorrect: {
		type: Boolean,
		required: true
	}
})

const questionSchema = new mongoose.Schema({
	text: {
		type: String,
		maxLength: 120,
		required: true,
		default: ""
	},
	options: {
		type: [optionSchema],
		validate: {
			validator: (v) => {
				const length = v.length;
				return length >= 1 && length <= 4;
			},
			message: "Only one to four options"
		}
	}
})

const baroofSchema = new mongoose.Schema({
	title: {
		type: String,
		default: "Untitled",
		trim: true,
		maxLength: 76,
	},
	owner: {
		type: String,
		required: true,
		validate: {
			validator: async (email) => {
				return await User.userExists(email);
			},
			message: "Owner does not exist"
		}
	},
	isFavorite: {
		type: Boolean,
		default: false
	},
	description: {
		type: String,
		default: "",
		maxLength: 500,
		trim: true
	},
	questions: {
		type: [questionSchema]
	},
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: true
	},
	numPlays: {
		type: Number,
		default: 0
	},
	numPlayers: {
		type: Number,
		default: 0
	}
})

baroofSchema.pre("validate", function(next) {
	const currentDate = new Date();
	if(!this.createdAt)
		this.createdAt = currentDate
	this.updatedAt = currentDate
	next();
})

baroofSchema.pre("save", function(next) {
	this.updatedAt = new Date();
	next();
})

module.exports = mongoose.model("Baroof", baroofSchema, "baroofs");
