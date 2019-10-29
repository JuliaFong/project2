const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    portfolios: [{type: mongoose.Schema.Types.ObjectId, ref: "Portfolio"}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;