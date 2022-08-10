const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usuariosDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));




function userLoguedMiddleware (req,res,next) {



let userFromCookie
let usuarioInCookie=req.cookies.usuario;

for(let i =0; i < usuarios.length; i++) {
    
    if (usuarios[i].usuario==usuarioInCookie) {
                userFromCookie = usuarios[i];
                
           }
        }
        if (req.session && userFromCookie){
            
            req.session.usuarioLogueado = userFromCookie;
            res.cookie("usuario",userFromCookie.usuario,{maxAge:60*1000*10});

        }

        if (req.session && req.session.usuarioLogueado){
            res.locals.isLogued = true;
            res.locals.usuarioLogueado = req.session.usuarioLogueado
           
        } else{
            res.locals.isLogued = false
        }
        
        next();
    }
    


module.exports=userLoguedMiddleware ;