const mongoose = require('mongoose')
coinsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    serverID: String,
    coins: String
});
module.exports = mongoose.model("Coins",coinsSchema)