const mongoose = require('mongoose')
xpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    serverID: String,
    level: String,
    xp: String
});
module.exports = mongoose.model("Xp",xpSchema)