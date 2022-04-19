const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const appRouter = require("./routes/");
const {initHosting} = require("./hosting");
const PORT = 4000;

async function dbConnect() {
	try {
		await mongoose.connect('mongodb://localhost:27017/test');
	} catch(err) {
		console.error("Could not connect to the database");
		console.error(err);
		process.exit(1);
	}
}

const app = express();
app.use(appRouter);

const server = http.createServer(app);

;(async function () {
	await dbConnect();
	console.log("connected to database");

	initHosting(server);
	console.log("initialized web socket server");

	server.listen(PORT, () => {
		console.log(`server listening on port ${PORT}`);
	});
})();
