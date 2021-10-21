module.exports = {
    name: "mute",
    help: process.env.PREFIX.concat(this.name, " <@user> [<time>]"),
    execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            let target = msg.mentions.members.first();
            if (target) {
                let role = msg.guild.roles.fetch(r => r.name === "Muted");
                if(!role) {
                    try {
                        role = msg.guild.createRole({
                            name: "Muted",
                            color:"#000000",
                            permissions:[]
                        });
        
                        msg.guild.channels.forEach(async (channel, id) => {
                            channel.overwritePermissions(role, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        });
                    } catch (e) {
                        console.log(e.stack)
                    }
                }
                console.log(target.roles);
                msg.reply("<@!"+target.id+"> was kicked");
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
