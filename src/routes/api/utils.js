const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.afterValidation = (req, res, next) => {
	const result = validationResult(req);
	try {
		result.throw();
		next();
	} catch(err) {
		const errors = result.array().map(({param, msg}) => ({param, msg}))
		res.json({
			success: false,
			msg: "Validation failed",
			errors
		})
	}
}

// TODO: move elsewhere
const SECRET = "secret_baroof";

module.exports.setToken = (res, {email, nickname}) => {
	const token = jwt.sign({email, nickname}, SECRET, {
		expiresIn: "7d",
		algorithm: "HS256"
	})
	res.cookie("token", token, {
		httpOnly: true,
		path: "/api",
		sameSite: "Lax"
	});
}

module.exports.checkToken = (token) => {
	return jwt.verify(token, SECRET);
}

module.exports.decodeToken = (token) => {
	return jwt.decode(token);
}
