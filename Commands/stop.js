module.exports = {
    name: "stop",
    help: "",
    music: true,
	async execute(msg, args, serverQueue, queue) {
        let err = "";
		const voiceChannel = await msg.member.voice.channel;
		if (serverQueue) {
			if (!(!voiceChannel || voiceChannel.id !== serverQueue.voiceChannel.id)) {
				serverQueue.songs = [];
				serverQueue.connection.dispatcher.end();
				msg.reply("Playlist arrêtée.");
			} else {
				err = err.concat("Vous devez être dans un channel vocal pour utiliser cette commande.");
			}
		} else {
			err = err.concat("Aucune musique n'est actuellement jouée");
		}

		if (err != "") {
            throw err;
        }
	}
}
