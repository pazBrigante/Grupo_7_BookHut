function guestMiddleware (req,res,next) {

if (req.session && req.session.usuarioLogueado){
    return res.redirect("edit/"+req.session.usuarioLogueado.id)

}
next();
}
module.exports=guestMiddleware;