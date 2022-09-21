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
    const nombre = document.querySelector('#nombre');
    const precio = document.querySelector('#precio');
    const descuento = document.querySelector('#descuento');
    const autor = document.querySelector('#autor');
    const descripcion = document.querySelector('#descripcion');
    const codigo = document.querySelector('#codigo');
    const categoria = document.querySelector('#categoria');
    const  product_img = document.querySelector('#product-img');
    const ulErrores = document.querySelector('#ul2');
    const errores = [];

    nombre.focus();

    nombre.addEventListener('blur', () => {
        
        if (nombre.value.trim() == '') {
            errores.push('El nombre esta vacio');
            nombre.classList.add('is-invalid');
            nombre.placeholder = 'El nombre esta vacio';
        } else if (nombre.value.length < 2) {
            errores.push('El nombre debe tener al menos dos caracteres');
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        };
    });

   precio.addEventListener('blur', () => {
      
        if (precio.value.trim() == '') {
            errores.push('El precio esta vacio');
            precio.classList.add('is-invalid');
            precio.placeholder = 'El precio esta vacio';
        } else if (precio.value.length < 2) {
            errores.push('El precio debe tener al menos dos caracteres');
            precio.classList.add('is-invalid');
        } else if (isNaN(precio.value)) {
            errores.push('El precio debe ser un número');
            precio.classList.add('is-invalid');
        } else {
            precio.classList.remove('is-invalid');
            precio.classList.add('is-valid');
        };
    });
    
    descripcion.addEventListener('blur', () => {
      
        if (descripcion.value.trim() == '') {
            errores.push('La decripcion esta vacio');
            descripcion.classList.add('is-invalid');
            descripcion.placeholder = 'La decripcion esta vacio';
        } else if (descripcion.value.length < 2) {
            errores.push('La decripcion debe tener al menos dos caracteres');
            descripcion.classList.add('is-invalid');
        } else {
            descripcion.classList.remove('is-invalid');
            descripcion.classList.add('is-valid');
        };
    });

    autor.addEventListener('blur', () => {
        console.log("dejé el autor");
        if (autor.value == '') {
            errores.push('El autor esta vacio');
            autor.classList.add('is-invalid');
            autor.placeholder = 'Este campo no puede estar vacio';
        } else if (autor.value.length < 4) {
            errores.push('El autor debe tener al menos 4 caracteres');
            autor.classList.add('is-invalid');
        } else {
            autor.classList.remove('is-invalid');
            autor.classList.add('is-valid');
        };
    });

   codigo.addEventListener('blur', () => {
        
        if (codigo.value.trim() == '') {
            errores.push('El código esta vacio');
            codigo.classList.add('is-invalid');
            codigo.placeholder = 'El código esta vacio';
        } else if (codigo.value.length < 4) {
            errores.push('El código debe tener al menos cuatro caracteres');
            codigo.classList.add('is-invalid');
        } else {
            codigo.classList.remove('is-invalid');
            codigo.classList.add('is-valid');
        };
    });

    //Verificación envio de form
    form.addEventListener('submit', (e) => {
        let error = []
    
        if (nombre.value.trim() == '') {
            error.push('El nombre esta vacio');
            nombre.classList.add('is-invalid');
            nombre.placeholder = 'El nombre esta vacio';
        } else if (nombre.value.length < 2) {
            error.push('El nombre debe tener al menos dos caracteres');
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        };
   

 
      
        if (precio.value.trim() == '') {
            error.push('El precio esta vacio');
            precio.classList.add('is-invalid');
            precio.placeholder = 'El precio esta vacio';
        } else if (precio.value.length < 2) {
            error.push('El precio debe tener al menos dos caracteres');
            precio.classList.add('is-invalid');
        } else if (isNaN(precio.value)) {
            error.push('El precio debe ser un número');
            precio.classList.add('is-invalid');
        } else {
            precio.classList.remove('is-invalid');
            precio.classList.add('is-valid');
        };
    
    
   
      
        if (descripcion.value.trim() == '') {
            error.push('La decripcion esta vacio');
            descripcion.classList.add('is-invalid');
            descripcion.placeholder = 'La decripcion esta vacio';
        } else if (descripcion.value.length < 2) {
            error.push('La decripcion debe tener al menos dos caracteres');
            descripcion.classList.add('is-invalid');
        } else {
            descripcion.classList.remove('is-invalid');
            descripcion.classList.add('is-valid');
        };
    

        

        if (autor.value == '') {
            error.push('El autor esta vacio');
            autor.classList.add('is-invalid');
            autor.placeholder = 'Este campo no puede estar vacio';
        } else if (autor.value.length < 4) {
            error.push('El autor debe tener al menos 4 caracteres');
            autor.classList.add('is-invalid');
        } else {
            autor.classList.remove('is-invalid');
            autor.classList.add('is-valid');
        };
        if (codigo.value.trim() == '') {
            error.push('El código esta vacio');
            codigo.classList.add('is-invalid');
            codigo.placeholder = 'El código esta vacio';
        } else if (codigo.value.length < 4) {
            error.push('El código debe tener al menos cuatro caracteres');
            codigo.classList.add('is-invalid');
        } else {
            codigo.classList.remove('is-invalid');
            codigo.classList.add('is-valid');
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
