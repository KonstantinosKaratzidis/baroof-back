const express = require("express");
const Baroof = require("../../models/Baroof");
const {authorizedRoute} = require("./utils.js");

const router = express.Router();
module.exports = router;

router.use(authorizedRoute);

router.get("/", async (req, res) => {
	const {email} = req.token;
	const data = await Baroof.find(
		{owner: email}, {__v: 0, owner: 0}
	)
	res.json({
		success: true,
		data
	})
})

router.get("/:_id", async (req, res) => {
	const {email} = req.token;
	const {_id} = req.params;
	const data = await Baroof.findOne(
		{owner: email, _id}, {__v: 0, owner: 0}
	)
	if(!data)
		return res.json({success: false})
	res.json({
		success: true,
		data
	})
})

router.delete("/:_id", async (req, res) => {
	const {_id} = req.params;
	const {email} = req.token;
	try {
		await Baroof.deleteOne({_id, owner: email});
		res.json({success: true});
	} catch (err){
		res.json({success: false});
	}
})

const allowedValues = new Set(Object.keys(Baroof.schema.paths));

function deleteFields(req, res, next){
	delete req.body.createdAt;
	delete req.body.updatedAt;
	delete req.body.owner;
	delete req.body._id;
	delete req.body.__v;
	next();
}

function removeInvalid(req, res, next){
	for(const key of Object.keys(req.body)){
		if(!allowedValues.has(key))
			return res.json({
				success: false,
				msg: `Invalid field "${key}"`
			})
	}
	next();
}

router.post("/",
	deleteFields,
	removeInvalid,
	async (req, res) => {
		const owner = req.token.email;
		const baroof = new Baroof({owner, ...req.body})
		try {
			await baroof.save()
			return res.json({success: true});
		} catch (err) {
			console.log(err.errors)
			return res.json({success: false});
		}
	}
)

router.put("/:_id",
	deleteFields,
	removeInvalid,
	async (req, res) => {
		const {_id} = req.params;
		const baroof = await Baroof.findOne({_id})
		if(!baroof)
			return res.json({
				success: false,
				msg: "Not found"
			})
		for(const key of Object.keys(req.body))
			baroof[key] = req.body[key];
		try {
			await baroof.save();
		} catch (err) {
			return res.json({
				success: false
			})
		}
		res.json({
			success: true,
			data: await Baroof.findOne({_id})
		})
	}
)
