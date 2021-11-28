const Discord = require('discord.js');
const TriggerObject = require('../Models/TriggerSchema');
module.exports = {
	name: "triggerlist",
	help: "",
	async execute(msg, args) {
		let err = "";
		try {
			const triggerList = await TriggerObject.find();

			let desc = "";
			for (let i = 0; i < triggerList.length; i++) {
				desc += "\n" + triggerList[i].trigger;
			}

			let embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle("Liste des triggers :")
				.setDescription(desc);

			msg.reply(embed);
		} catch(err) {
			msg.reply('Erreur : failure during database reading.');
		}

		if (err != "") {
			throw err;
		}
	}
}
