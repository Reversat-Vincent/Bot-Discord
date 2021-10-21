module.exports = {
    name: "mute",
    help: process.env.PREFIX.concat(this.name, " <@user> [<time>]"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("MUTE_MEMBERS")) {
            let target = msg.mentions.members.first();
            if (target) {
                if (!(target.id === msg.author.id)) {
                    console.log(target.permissions.toArray());
                    msg.reply("<@!"+target.id+"> was muted");
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
