const express = require("express");

const router = express.Router();
module.exports = router;

router.post("/", (req, res) => {
	if(req.cookies.token)
		res.clearCookie("token", {
			httpOnly: true,
			path: "/api",
			sameSite: "Lax"
		})

	res.json({
		success: true,
		msg: "Logout"
	})
})
