const mongoose = require('mongoose');

const TriggerSchema = mongoose.Schema({
    trigger: {
        type: String,
        required: true,
        unique: true
    },
    reponse: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TriggerObject', TriggerSchema);