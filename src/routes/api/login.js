const express = require("express");
const {body, validationResult} = require("express-validator");
const {afterValidation, setToken, checkToken, decodeToken} = require('./utils.js');
const User = require("../../models/User.js");

const router = express.Router();
module.exports = router;

router.post("/",
	body("email", "Invalid E-mail").trim().not().isEmpty(),
	body("password", "Invalid password").trim().not().isEmpty(),
	afterValidation,
	async (req, res) => {
		const {email, password} = req.body;
		const users = await User.findByEmail(email);
		if(users.length === 0){
			return res.json({
				success: false,
				msg: "User not found",
				errors: [{ param: "email", msg: "Invalid E-mail" }]
			});
		}

		const user = users[0]
		if(!user.checkPassword(password)){
			return res.json({
				success: false,
				msg: "Authentication failed",
				errors: [{ param: "password", msg: "Invalid password"}]
			});
		}

		setToken(res, {email, nickname: user.nickname})
		res.json({success: true})
	}
)

router.get("/", (req, res) => {
	const {token} = req.cookies;
	if(!token || !checkToken(token)){
		return res.json({success: true, data: {isLoggedIn: false}});
	}
	res.json({success: true, data: {isLoggedIn: true}});
})
