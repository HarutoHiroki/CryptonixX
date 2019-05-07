const mongoose = require('mongoose');

module.exports = mongoosemodel =>{
xpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverid: String,
    userID: String,
    xp: String
});

coinsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverid: String,
    userID: String,
    coins: String
});

warnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    warnedBy: String,
    warnedByID: String,
    time: String
});
}