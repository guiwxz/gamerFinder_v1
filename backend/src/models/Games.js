const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
    Games: [String]
})

mongoose.model('Games', GamesSchema);