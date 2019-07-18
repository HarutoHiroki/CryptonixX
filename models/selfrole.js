const mongoose = require('mongoose')
selfroleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: Number,
    selfroleID: String,
});
module.exports = mongoose.model("Selfrole",selfroleSchema)