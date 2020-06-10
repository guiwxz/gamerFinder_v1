const mongoose = require('mongoose');
const parseStringAsArray = require('../utils/parseStringAsArray');
const User = mongoose.model('User');

mongoose.set('useCreateIndex', true);

module.exports = {
    async store(request, response){
        try{
            const user = await User.create(request.body);
            return response.json(user);
        }catch(err){
            response.json(0);
        }   
    },

    async update(request, response){
        const { nickname, description, connections, games, location, avatar } = request.body

        
       // const gamesArray = parseStringAsArray(games);
        
        const user = await User.findByIdAndUpdate(request.params.id, { nickname, description, connections, games, location, avatar }, { new: true });

        return response.json(user);
    },

    async login(request, response){
        const { login } = request.body;

        const user = await User.findOne({login});

        if(!user) {
            return response.status(400).json({ error: 'Login não cadastrado' })
        }

        return response.json(user);
    },

    async load(request, response){
        const user = await User.findById(request.params.id);

        return response.json(user);
    },

    async index(request, response){
        const user = await User.find();

        return response.json(user);
    }
}