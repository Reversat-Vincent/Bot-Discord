module.exports = {
    name: "ban",
    help: " <@user> [<raison>]",
    async execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("BAN_MEMBERS")) {
            let target = msg.mentions.members.first();
            if (target) {
                if (!(target.id === msg.author.id)) {
                    target.ban(args[2]);
                    msg.reply("<@!"+target.id+"> was ban");
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
