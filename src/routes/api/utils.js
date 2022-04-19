const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

function afterValidation(req, res, next) {
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

function setToken(res, {email, nickname}) {
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

function checkToken(token) {
	try {
		return jwt.verify(token, SECRET);
	} catch(err) {
		return false;
	}
}

function decodeToken(token) {
	return jwt.decode(token);
}

function authorizedRoute(req, res, next) {
	if(!req.cookies.token || !checkToken(req.cookies.token))
		return res.json({success: false, msg: "Unauthorized"});
	req.token = decodeToken(req.cookies.token)
	next();
}

module.exports = {
	afterValidation,
	setToken,
	checkToken,
	decodeToken,
	authorizedRoute
};
