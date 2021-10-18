module.exports = {
    name: "kick",
    help: process.env.PREFIX.concat(this.name, " <@user> [<raison>]"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("KICK_MEMBERS")) {
            let target = msg.mentions.members.first();
            if (target) {
                if (!(target.id === msg.author.id)) {
                    target.kick(args[2]);
                    msg.reply("<@!"+target.id+"> was kicked");
                } else {
                    err = err.concat("<@user> ne doit pas vous désigner");
                }
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
