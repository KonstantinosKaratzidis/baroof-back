const {validationResult} = require("express-validator");
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
