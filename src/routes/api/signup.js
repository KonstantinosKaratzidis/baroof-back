const express = require("express");
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const {body, validationResult} = require("express-validator");
const {afterValidation} = require('./utils.js');

router = express.Router();
module.exports = router;

// validation middleware
router.post("/", 
	body("email", "Invalid email").isEmail().normalizeEmail(),
	body("nickname", "Nickname cannot be empty").trim().not().isEmpty(),
	body("password", "At least 6 characters").isStrongPassword({
		minLength: 6, minLowercase: 0, minUppercase: 0,
		minNumbers: 0, minSymbols: 0
	}),
	afterValidation
)

router.post("/", async (req, res) => {
	const {email, nickname, password} = req.body;
	const user = new User({email, nickname, password})
	try {
		await user.save();
	} catch(err) {
		if(err.code === 11000){ // duplicate (email taken)
			return res.json({
				success: false,
				msg: "Email taken",
				errors: [{param: "email", msg: "E-mail not available"}]
			})
		} else {
			console.log("unknown error", err)
			return res.json({
				sucess: false,
				msg: "Unknown error"
			})
		}
	}
	res.status(200).json({
		success: true,
		msg: "User created"
	});
})
