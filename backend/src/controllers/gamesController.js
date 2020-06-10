const mongoose = require('mongoose');
const Game = mongoose.model('Games');

mongoose.set('useCreateIndex', true);

module.exports = {
    async store(request, response){
        const game = await Game.create(request.body);
        return response.json(game);
    },

    async index(request, response){
        const games = await Game.find();
        return response.json(games);
    },

    async delete(request, response){
        const game = await Games.findById(request.params.id);
        return response.json(game);
    }
}