
const ytdl = require("ytdl-core");
const play = require("../play");
module.exports = {
    name: "play",
    help: " <url>|<search>",
    music: true,
	async execute(msg, args, serverQueue, queue) {
        let err = "";
		let song;
		if (args[1]) {
			const voiceChannel = await msg.member.voice.channel;
			if (voiceChannel) {
				if (ytdl.validateID(args[1]) || ytdl.validateURL(args[1])) {
					const songInfo = await ytdl.getInfo(args[1]);
					song = {
						title: songInfo.videoDetails.title,
						url: songInfo.videoDetails.video_url
					}
					if (!serverQueue) {
						const queueContruct = {
							textChannel: msg.channel,
							voiceChannel: voiceChannel,
							connection: null,
							songs: [],
							volume: 50,
							playing: true
						};

						queue.set(msg.guild.id, queueContruct);
						queueContruct.songs.push(song);

						try {
							async function joinChannel() {
								queueContruct.connection = await voiceChannel.join();
								play(msg.guild, queueContruct.songs[0], queue);
							}
							joinChannel();
						} catch (err) {
							queue.delete(msg.guild.id);
							msg.reply('Error : '.concat(err));
						}
					} else {
						serverQueue.songs.push(song);
						msg.reply(`${song.title} has been added to the queue!`);
					}
				}
			} else {
				err = err.concat("Vous devez être dans un channel vocal pour utiliser cette commande.");
			}
		} else {
			err = err.concat("paramètre(s) manquant(s)");
		}

		if (err != "") {
            throw err;
        }
	}
}
