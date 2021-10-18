require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.once('ready', () => console.log("Bot ready !"));
client.once('reconnecting', () => console.log("Reconnected !"));
client.once('disconnect', () => console.log("Disconnected !"));

const cmd = require('./commands.js');

client.on('message', async (msg) => {
	if (msg.content.startsWith(process.env.PREFIX)) {
		const args = msg.content.split(' ');
		if (cmd.get(args[0].substring(1))) {
			try {
				cmd.get(args[0].substring(1)).execute(msg, args);
			} catch (err) {
				msg.reply('Argument(s) invalide(s) : '.concat(err));
			}
		} else {
			msg.reply("Commande inconnue");
		}
	}
});

client.login(process.env.DISCORD_TOKEN);