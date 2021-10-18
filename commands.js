const fs = require('fs');
commandMap = new Map();
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith('.js'));
for(const commandFile of commandFiles) {
	const command = require(`./Commands/${commandFile}`);
	commandMap.set(command.name, command);
}

module.exports = commandMap;