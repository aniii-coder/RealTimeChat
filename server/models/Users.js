const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
}) ;

const Users = new mongoose.model('User', userSchema)
module.exports = Users;