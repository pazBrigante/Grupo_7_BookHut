const express = require('express');
const app = express();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

app.listen(3000, () => console.log('Servidor en linea en puerto 3000'));

app.get('/', function (req, res){
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});
