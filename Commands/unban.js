module.exports = {
    name: "unban",
    help: process.env.PREFIX.concat(this.name, " <@user>"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("BAN_MEMBERS")) {
            msg.guild.fetchBans().then(bans => {
                let target = bans.find( u => {
                    return '@' + u.user.username === args[1];
                });
                if (target != undefined) {
                    if (!(target.user.id === msg.author.id)) {
                        msg.guild.members.unban(target.user.id);
                        msg.reply("<@!"+target.user.id+"> was unban");
                    } else {
                        err = err.concat("<@user> ne doit pas vous désigner");
                    }
                } else {
                    err = err.concat("<@user> est manquant");
                }
            });
        } else {
            err = err.concat("Vous n'avez pas les permissions nécessaire");
        }

        if (err != "") {
            throw err;
        }
    }
}
