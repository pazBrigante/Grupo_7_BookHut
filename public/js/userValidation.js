window.onload = function () {
    //let titulo = document.querySelector('.moviesAddTitulo')
    //let formulario = document.querySelector('#formulario');
    //let article = document.querySelector('article');
    //titulo.innerHTML = 'AGREGAR PELÍCULA';
    //titulo.classList.add('titulo');
    //article.classList.add('fondoTransparente');
    //formulario.classList.add('fondoCRUD');

    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE REGISTRO DE PELÍCULAS------------------//    
    let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    function isEmailValid(email) {
        if (!email)
            return false;
        if(email.length>254)
            return false;
        var valid = emailRegex.test(email);
        if(!valid)
            return false;
        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if(parts[0].length>64)
            return false;
        var domainParts = parts[1].split(".");
        if(domainParts.some(function(part) { return part.length>63; }))
            return false;
        return true;
    }
    const form = document.querySelector('#form');
    const usuario = document.querySelector('#usuario');
    const email = document.querySelector('#email');
    const nacimiento = document.querySelector('#date');
    const domicilio = document.querySelector('#domicilio');
    const password = document.querySelector('#pass');
    //const codigo = document.querySelector('#codigo');
    //const categoria = document.querySelector('#categoria');
    //const  product_img = document.querySelector('#product-img');
    const ulErrores = document.querySelector('#ul2');
    const ulErroresBack = document.querySelector('#ul1');
    const errores = [];

    usuario.focus();
    
    usuario.addEventListener('input', () => {
        
        if (usuario.value.trim() == '' ) {
            errores.push('El usuario esta vacio');
            usuario.classList.add('is-invalid');
            usuario.placeholder = 'El usuario esta vacio';
        } else if (usuario.value.length < 2) {
            errores.push('El usuario debe tener al menos dos caracteres');
            usuario.classList.add('is-invalid');
        } else {
            usuario.classList.remove('is-invalid');
            usuario.classList.add('is-valid');
        };
    });

   email.addEventListener('input', () => {
      
        if ((email.value.trim() == '') || (!isEmailValid(email.value))) {
            errores.push('El email es inválido');
            email.classList.add('is-invalid');
            email.placeholder = 'inválido';
        } else if (email.value.length < 2) {
            errores.push('El email debe tener al menos dos caracteres');
            email.classList.add('is-invalid');
        
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        };
    });
    
    nacimiento.addEventListener('input', () => {
      
        if (nacimiento.value.trim() == '') {
            errores.push('La nacimiento esta vacio');
            nacimiento.classList.add('is-invalid');
            nacimiento.placeholder = 'La nacimiento esta vacio';
        } else if (nacimiento.value.length < 2) {
            errores.push('La nacimiento debe tener al menos dos caracteres');
            nacimiento.classList.add('is-invalid');
        } else {
            nacimiento.classList.remove('is-invalid');
            nacimiento.classList.add('is-valid');
        };
    });
if (password) {
    password.addEventListener('input', () => {
        console.log("dejé el password");
        if (password.value == '') {
            errores.push('El password esta vacio');
            password.classList.add('is-invalid');
            password.placeholder = 'Este campo no puede estar vacio';
        } else if (password.value.length < 4) {
            errores.push('El password debe tener al menos 4 caracteres');
            password.classList.add('is-invalid');
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
        };
    });
};
   

    //Verificación envio de form
    form.addEventListener('submit', (e) => {
        let error = []
        
        
        
            if (usuario.value.trim() == '') {
                error.push('El usuario esta vacio');
                usuario.classList.add('is-invalid');
                usuario.placeholder = 'El usuario esta vacio';
            } else if (usuario.value.length < 2) {
                error.push('El usuario debe tener al menos dos caracteres');
                usuario.classList.add('is-invalid');
            } else {
                usuario.classList.remove('is-invalid');
                usuario.classList.add('is-valid');
            };
        
    
       
            if ((email.value.trim() == '') || (!isEmailValid(email.value))) {
                error.push('El email es inválido');
                email.classList.add('is-invalid');
              
            
            } else if (email.value.length < 2) {
                error.push('El email debe tener al menos dos caracteres');
                email.classList.add('is-invalid');
            
            } else {
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
            };
        
        
     
          
            if (nacimiento.value.trim() == '') {
                error.push('La nacimiento esta vacio');
                nacimiento.classList.add('is-invalid');
                nacimiento.placeholder = 'La nacimiento esta vacio';
            } else if (nacimiento.value.length < 2) {
                error.push('La nacimiento debe tener al menos dos caracteres');
                nacimiento.classList.add('is-invalid');
            } else {
                nacimiento.classList.remove('is-invalid');
                nacimiento.classList.add('is-valid');
            };
     
    
        
            if (password) {
            if (password.value == '') {
                error.push('El password esta vacio');
                password.classList.add('is-invalid');
                password.placeholder = 'Este campo no puede estar vacio';
            } else if (password.value.length < 4) {
                error.push('El password debe tener al menos 4 caracteres');
                password.classList.add('is-invalid');
            } else {
                password.classList.remove('is-invalid');
                password.classList.add('is-valid');
            };
        };
    
       
    
        if (error.length > 0) {
            e.preventDefault();
            ulErrores.innerHTML = '';
            for (let i = 0; i < error.length; i++) {
                ulErrores.classList.add('alert-warning');
                ulErrores.innerHTML += '<li>' + error[i] + '</li>';
                
            };
            
        };

        if (error.length == 0) {
            form.submit()
            
        };
    });
}
