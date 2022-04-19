const {Server} = require("socket.io");

const socketServer = new Server({
	serveClient: false
});

function initHosting(httpServer){
	socketServer.attach(httpServer)
}

module.exports = {
	initHosting
}
