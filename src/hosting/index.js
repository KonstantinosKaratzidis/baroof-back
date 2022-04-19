const {Server} = require("socket.io");
const {createGamePin} = require("./util.js");

const socketServer = new Server({
	serveClient: false
});

const ongoing = {};

function initHosting(httpServer){
	socketServer.attach(httpServer);
}

function createGame(baroof){
	const gamePin = createGamePin();

	return gamePin;
}


module.exports = {
	initHosting,
	createGame
};
