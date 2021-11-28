require('dotenv').config();
const Discord = require('discord.js');
const mongoose = require('mongoose');

const DB_ADDRESS = 'mongodb://127.0.0.1:27017/Triggers';
mongoose.connect(
    DB_ADDRESS,
    {useNewUrlParser : true},
    (error) => {
        if(error)
            console.log(error);
        else
            console.log("Connected to DB");
    }
);


const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.once('ready', () => console.log("Bot ready !"));
client.once('reconnecting', () => console.log("Reconnected !"));
client.once('disconnect', () => console.log("Disconnected !"));

const cmd = require('./commands.js');
const trigger = require('./trigger.js');

const queue = new Map();

client.on('message', async (msg) => {
	if (msg.content.startsWith(process.env.PREFIX)) {
		const args = msg.content.split(' ');
		if (cmd.get(args[0].substring(1))) {
			try {
				if (args[1] === "--help" || args[1] === "--h") {
					msg.reply(args[0].concat(cmd.get(args[0].substring(1)).help));
				} else {
					cmd.get(args[0].substring(1)).execute(msg, args);
				}
			} catch (err) {
				msg.reply('Error : '.concat(err));
			}
		} else {
			msg.reply("Commande inconnue");
		}
	} else {
		trigger.execute(msg);
	}
});

client.on('guildMemberAdd', guildMember => {
	const memberRole = guildMember.guild.roles.cache.find(r => r.name === "Member");
	guildMember.roles.add(memberRole);
	const brainRole = guildMember.guild.roles.cache.find(role => role.name === "Brain");
	guildMember.roles.remove(brainRole);
	const heartRole = guildMember.guild.roles.cache.find(role => role.name === "Heart");
	guildMember.roles.remove(heartRole);
	const brainEmoji = '🧠';
	const heartEmoji = '🫀';
	let embed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle("Bienvenue" + guildMember.user.username)
						.setDescription("Agissez-vous avec la raison ou avec le cœur ?");
	let welcomeChannel = guildMember.guild.channels.cache.find(c => c.name === "bienvenue");
	welcomeChannel.send(embed)
		.then(messageEmbed => {
			messageEmbed.react(brainEmoji);
			messageEmbed.react(heartEmoji);
		})
		.catch(console.error);
	client.on('messageReactionAdd', async (reaction, user) => {
		if (client.user.id != user.id && reaction.message.channel.id == welcomeChannel) {
			if (reaction.emoji.name === brainEmoji) {
				await reaction.message.reactions.resolve(heartEmoji).users.remove(user.id);
				await reaction.message.guild.members.cache.get(user.id).roles.add(brainRole);
			}
			if (reaction.emoji.name === heartEmoji) {
				await reaction.message.reactions.resolve(brainEmoji).users.remove(user.id);
				await reaction.message.guild.members.cache.get(user.id).roles.add(heartRole);
			}
		}
	});
	client.on('messageReactionRemove', async (reaction, user) => {
		if (client.user.id != user.id && reaction.message.channel.id == welcomeChannel) {
			if (reaction.emoji.name === brainEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove(brainRole);
			}
			if (reaction.emoji.name === heartEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove(heartRole);
			}
		}
	});
});

client.login(process.env.DISCORD_TOKEN);