const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/userController');
const GamesController = require('./controllers/gamesController');

routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.post("/login", UserController.login);
routes.get("/load/:id", UserController.load);
routes.get("/list", UserController.index);

routes.post("/games", GamesController.store);
routes.get("/games", GamesController.index);
routes.delete("/games/:id", GamesController.delete);

module.exports = routes;
