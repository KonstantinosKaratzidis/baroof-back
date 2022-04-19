const express = require("express");
const Baroof = require("../../models/Baroof");
const {authorizedRoute} = require("./utils.js");
const {createGame} = require("../../hosting");

const router = express.Router();
module.exports = router;

router.use(authorizedRoute);

router.post("/:baroofId", async (req, res) => {
	const {email} = req.token;
	const data = await Baroof.findOne(
		{owner: email}, {__v: 0, owner: 0}
	)

	if(!data)
		return res.json({
			success: false,
			msg: "Baroof was not found"
		})

	const gamePin = createGame();

	res.json({
		success: true,
		data: gamePin
	})
})
