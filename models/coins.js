const mongoose = require('mongoose')
coinsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: Number,
    coins: Number
});
module.exports = mongoose.model("Coins",coinsSchema)