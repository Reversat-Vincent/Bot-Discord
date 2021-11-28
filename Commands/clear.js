module.exports = {
    name: "clear",
    help: " <nbMessages>",
    execute(msg, args) {
        let err = "";
        let nbMessages = parseInt(args[1], 10);
        if (nbMessages > 0 && nbMessages <= 100) {
            msg.channel.bulkDelete(nbMessages);
        } else {
            err = err.concat("<nbMessages>");
        }

        if (err != "") {
            throw err;
        }
    }
}
