const express = require('express');

const app = express();

app.listen(3000, () => console.log('Esto fue exitoso'));

app.get('/', function (req, res){
    res.send('Bienvenidos a BooK Hut');
});
