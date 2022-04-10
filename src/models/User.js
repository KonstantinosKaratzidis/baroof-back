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

userSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

userSchema.static("findByEmail", async function(email){
	return await this.find({email});
})

userSchema.static("userExists", async function(email) {
	const user = await this.exists({email})
	return Boolean(user)
})

module.exports = mongoose.model("User", userSchema, "users");
