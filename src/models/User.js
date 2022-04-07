const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	nickname: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		set: (v) => {
			return bcrypt.hashSync(v, 10);
		}
	}
});

module.exports = mongoose.model("User", userSchema, "users");
