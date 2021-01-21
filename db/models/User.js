const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    isStudent: { type: Boolean, required: true }
})

module.exports = mongoose.model('User', userSchema);