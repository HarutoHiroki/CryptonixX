const mongoose = require('mongoose')
antispamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: Number,
    status: String,
    warnBuffer: Number, 
    maxBuffer: Number,
    maxtime: Number,
    warnMessage: String,
    banMessage: String,
    maxdupwarn: Number,
    maxdupban: Number,
    deleteno: Number,
    exeptionroles: String
});
module.exports = mongoose.model("Antispam",antispamSchema)