const ytdl = require("ytdl-core");

module.exports = function play(guild, song, queue) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        serverQueue.textChannel.send("Fin de la playlist");
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0], queue);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 50);
    serverQueue.textChannel.send(`Commence à jouer : **${song.title}**`);
}