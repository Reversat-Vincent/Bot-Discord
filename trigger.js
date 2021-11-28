const TriggerObject = require('./Models/TriggerSchema');
module.exports = {
	async execute(msg) {
		const trigger = await TriggerObject.findOne({trigger: msg.content});
		if (trigger != null) {
			msg.reply(trigger.reponse);
		}
	}
}
