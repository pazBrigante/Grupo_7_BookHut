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
    const errores = [];

    usuario.focus();

    usuario.addEventListener('blur', () => {
        
        if (usuario.value.trim() == '') {
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

   email.addEventListener('blur', () => {
      
        if (email.value.trim() == '') {
            errores.push('El email esta vacio');
            email.classList.add('is-invalid');
            email.placeholder = 'El email esta vacio';
        } else if (email.value.length < 2) {
            errores.push('El email debe tener al menos dos caracteres');
            email.classList.add('is-invalid');
        
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        };
    });
    
    nacimiento.addEventListener('blur', () => {
      
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
    password.addEventListener('blur', () => {
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
        
    
       
          
            if (email.value.trim() == '') {
                error.push('El email esta vacio');
                email.classList.add('is-invalid');
                email.placeholder = 'El email esta vacio';
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
