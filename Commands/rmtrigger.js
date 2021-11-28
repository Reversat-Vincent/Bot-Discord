const TriggerObject = require('../Models/TriggerSchema');
module.exports = {
    name: "rmtrigger",
    help: " <trigger>",
    async execute(msg, args) {
        let err = "";
        if (args[1]) {
            let arg = "";
            for (let i = 0; i < args.length; i++) {
                if (i != 0) {
                    arg = arg.concat(args[i]).concat(" ");
                }
            }
            let trigger = arg.trim();
            if (trigger.startsWith("\"") && trigger.endsWith("\"")) {
                trigger = trigger.substring(1, trigger.length-1).trim();
            }
            const res = await TriggerObject.deleteOne({trigger: trigger});
            if (res.ok == 1) {
                msg.reply("Successfully deleted trigger **" + trigger + "**");
            } else {
                err = err.concat("Failure during trigger deletion");
            }
        } else {
            err = err.concat("<trigger> est manquant");
        }

        if (err != "") {
            throw err;
        }
    }
}
