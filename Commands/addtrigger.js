const TriggerObject = require('../Models/TriggerSchema');
module.exports = {
    name: "addtrigger",
    help: process.env.PREFIX.concat(this.name, " <trigger>"),
    async execute(msg, args) {
        let err = "";
        if (msg.member.hasPermission("SEND_MESSAGES")) {
            if (args[1]) {
                let splitTrigger = args[1].split("=");
                let trigger = splitTrigger[0];
                let reponse = splitTrigger[1];
                try {
                    const res = await TriggerObject.create({trigger: trigger, reponse: reponse});
                    msg.reply("Successfully created trigger **" + res.trigger + "**");
                } catch(err) {
                    console.log(err);
                }
            } else {
                err = err.concat("<trigger> est manquant");
            }
        } else {
            err = err.concat("Vous n'avez pas les permissions nécessaire");
        }

        if (err != "") {
            throw err;
        }
    }
}
