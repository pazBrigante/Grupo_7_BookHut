const express = require('express');
const app = express();

const path = require('path');
const publicFolderPath = path.resolve(__dirname, './public');
app.use(express.static(publicFolderPath));

app.listen(3030, () => console.log('Servidor en linea en puerto 3030'));

app.get('/', function (req, res){
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get("/register",(req,res)=> {
    res.sendFile(__dirname +'/views/register.html');
});

