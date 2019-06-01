const mongoose = require('mongoose')
selfroleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    selfroleID: String,
});
module.exports = mongoose.model("Selfrole",selfroleSchema)