const express = require('express');
const cors = require('cors');

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors(/* parametros como: dominios que quer dar acesso... */));

require('./connection')

require('./src/models/User');
require('./src/models/Games');

//rotas
app.use('/', require('./src/routes'));

app.listen(3001);