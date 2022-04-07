const express = require("express");

const router = express.Router();
module.exports = router;

router.get("/login", (req, res) => {
	res.status(200).end("Check if logged in");
})

router.post("/login", (req, res) => {
	res.status(200).end("Login");
})

router.post("/signup", (req, res) => {
	res.status(200).end("signup");
})
