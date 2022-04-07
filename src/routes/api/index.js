const express = require("express");
const bodyParser = require("body-parser");
const signupRouter = require("./signup.js");
const cors = require("cors");

const router = express.Router();
module.exports = router;

router.use(bodyParser.json());

// TODO: change for development and production
router.use(cors({
	origin: "http://localhost:3000"
}))


router.get("/login", (req, res) => {
	res.status(200).end("Check if logged in");
})

router.post("/login", (req, res) => {
	res.status(200).end("Login");
})

router.use("/signup", signupRouter);
