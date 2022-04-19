function createGamePin(){
	let pin = "";
	for(let i = 0; i < 7; i++)
		pin += Math.floor(Math.random() * 9 + 1)
	return pin;
}

module.exports = {
	createGamePin
}
