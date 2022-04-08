const express = require("express");
const bodyParser = require("body-parser");
const signupRouter = require("./signup.js");
const loginRouter = require("./login.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = express.Router();
module.exports = router;

router.use(bodyParser.json());
router.use(cookieParser());

// TODO: change for development and production
router.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
