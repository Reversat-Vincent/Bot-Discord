const ms = require('ms');
module.exports = {
    name: "mute",
    help: " <@user> [<time>]",
    async execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            let target = msg.mentions.members.first();
            if (target) {
                let mutedRole = msg.guild.roles.cache.find(r => r.name === "Muted");
                let memberRole = msg.guild.roles.cache.find(r => r.name === "Member");
                target.roles.add(mutedRole);
                target.roles.remove(memberRole);
                msg.reply("<@!"+target.id+"> was muted");
                setTimeout(() => {
                    if (target.roles.cache.find(r => r.name === "Muted")) {
                        target.roles.add(memberRole);
                        target.roles.remove(mutedRole);
                        msg.reply("<@!"+target.id+"> was unmuted");
                    }
                }, ms(args[2]));
            } else {
                err = err.concat("<@user> est manquant");
            }
        } else {
            err = err.concat("Vous n'avez pas les permissions nécessaire");
        }
        if (err != "") {
            throw err;
        }
    }
}
