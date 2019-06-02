const mongoose = require('mongoose')
punishSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    mutestatus: String,
    mute: Number,
    banstatus: String,
    ban: Number
});
module.exports = mongoose.model("Punish",punishSchema)