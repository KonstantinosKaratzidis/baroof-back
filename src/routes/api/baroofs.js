const express = require("express");
const Baroof = require("../../models/Baroof");
const {authorizedRoute} = require("./utils.js");

const router = express.Router();
module.exports = router;

router.use(authorizedRoute);

router.get("/", async (req, res) => {
	const {email} = req.token;
	const data = await Baroof.find(
		{owner: email}, {questions: 0, __v: 0, owner: 0}
	)
	res.json({
		success: true,
		data
	})
})

router.delete("/:_id", async (req, res) => {
	const {_id} = req.params;
	console.log("delete", _id);
	try {
		await Baroof.deleteOne({_id})
		res.json({success: true});
	} catch (err){
		res.json({success: false});
	}
})
