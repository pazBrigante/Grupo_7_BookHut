const express = require('express');
const app = express();

const path = require('path');

app.listen(3000, () => console.log('Servidor en linea en puerto 3000'));

app.get('/', function (req, res){
    res.send('Bienvenidos a The BooK Hut');
});
