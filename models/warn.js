const mongoose = require('mongoose');

const warnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    username: String,
    userID: String,
    reason: String,
    wUsername: String,
    wID: String,
    warnid: String,
    time: String
});

module.exports = mongoose.model("Warn",warnSchema)