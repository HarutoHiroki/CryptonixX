const mongoose = require('mongoose')
guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dbID: Number,
    guildID: String
});
module.exports = mongoose.model("Guild",guildSchema)