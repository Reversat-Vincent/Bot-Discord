const Discord = require('discord.js');
module.exports = {
    name: "poll",
    help: process.env.PREFIX.concat(this.name, " <title> [<args>]"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("SEND_MESSAGES")) {
            if (args[1]) {
                let desc = "";
                let tabOfReact = args.slice(2);
                let regionalIndicatorA = 127462;
                for (let i = 0; i < tabOfReact.length; i++) {
                    desc += "\n" + String.fromCodePoint(regionalIndicatorA + i) + " " + tabOfReact[i].slice(1, -1);
                }
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(args[1].slice(1, -1))
                    .setDescription(desc);
                msg.channel.send(embed)
                    .then(messageEmbed => {
                        for (let i = 0; i < tabOfReact.length; i++) {
                            messageEmbed.react(String.fromCodePoint(regionalIndicatorA + i));
                        }
                    })
                    .catch(console.error);
            } else {
                err = err.concat("<title> est manquant");
            }
        } else {
            err = err.concat("Vous n'avez pas les permissions nécessaire");
        }

        if (err != "") {
            throw err;
        }
    }
}
