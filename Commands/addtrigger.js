const TriggerObject = require('../Models/TriggerSchema');
module.exports = {
    name: "addtrigger",
    help: " <trigger>=<reponse>",
    async execute(msg, args) {
        let err = "";
        if (args[1]) {
            let arg = "";
            for (let i = 0; i < args.length; i++) {
                if (i != 0) {
                    arg = arg.concat(args[i]).concat(" ");
                }
            }

            let splitTrigger = arg.trim().split("=");
            // Regex faite maison qui permet de matcher les syntaxes suivantes :
            //      - triggerSansEspace=reponseSansEspace
            //      - "trigger avec des espaces"="reponse avec des espaces"
            //      - triggerSansEspace="reponse avec des espaces"
            // etc...
            if (arg.match(/(?:["].{1,}["]|\S{1,})[=](?:["].{1,}["]|\S{1,})/g)[0].trim() == arg.trim() && splitTrigger.length === 2) {
                let trigger = splitTrigger[0];
                if (splitTrigger[0].startsWith("\"") && splitTrigger[0].endsWith("\"")) {
                    trigger = splitTrigger[0].substring(1, splitTrigger[0].length-1);
                }
                let reponse = splitTrigger[1];
                if (splitTrigger[1].startsWith("\"") && splitTrigger[1].endsWith("\"")) {
                    reponse = splitTrigger[1].substring(1, splitTrigger[1].length-1);
                }
                try {
                    const res = await TriggerObject.create({trigger: trigger, reponse: reponse});
                    msg.reply("Successfully created trigger **" + trigger + "**");
                } catch (err) {
                    msg.reply('Error : failure during trigger creation');
                }
            } else {
                err = err.concat("paramètre(s) invalide(s)");
            }
        } else {
            err = err.concat("paramètre(s) manquant(s)");
        }

        if (err != "") {
            throw err;
        }
    }
}
