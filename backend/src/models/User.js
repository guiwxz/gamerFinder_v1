const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login:{
        type: String,
        required: true,
        index: { unique: true },
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    games: {
        type: [String],
        required: false,
    },
    location: {
        type: [Number],
        required: false
    },
    connections: [String],

    avatar: String,

    
})

mongoose.model('User', UserSchema);