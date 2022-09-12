/*const fetch = require('node-fetch'); 198 (gzipped: 302)

module.export = {
    list: async (req, res) =>{
        fetch('acá va al url de la api')
        .then(response => response.json()) //acá pido los datos en formato json
        .then(countries => {               //acá ya empiezo a utiilizar los datos
            //return res.json (countries) //En la url que tenemos configurada en la ruta deberiamos ver los datos en formato json
        return res.render('apiTerceros', {countries: countries})//de esta forma pasamos los datos a la vista
        }) 
    }
/
//para agregar otra api utilizamos el método async 

module.export = {
    list: async (req, res) =>{
        let terceros = await fetch('acá va al url de la api').then(response => response.json()) 
        let otrosTerceros = await fetch('acá va al url de la api').then(response => response.json()) 
       
     return res.render('apiTerceros', {terceros, otrosTerceros})
    }
}*/