module.exports = {
    name: "unban",
    help: process.env.PREFIX.concat(this.name, " <@user>"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("BAN_MEMBERS")) {
            let target = msg.mentions.members.first();
            if (target) {
                if (!(target.id === msg.author.id)) {
                    target.unban(target.id);
                    msg.reply("<@!"+target.id+"> was unban");
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
