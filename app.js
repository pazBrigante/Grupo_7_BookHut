const express = require('express');
<<<<<<< HEAD

const app = express();

app.listen(3000, () => console.log('Esto fue exitoso'));

app.get('/', function (req, res){
    res.send('Bienvenidos a BooK Hut');
=======
const app = express();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

app.listen(3000, () => console.log('Servidor en linea en puerto 3000'));

app.get('/', function (req, res){
    res.sendFile(path.resolve(__dirname, './views/index.html'));
>>>>>>> 6f35476179aa053764946016bc2262d139cc29af
});
