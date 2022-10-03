window.onload =function() {
    
    
    
    const listado= document.querySelector("#listado");
    const comprar= document.querySelector("#comprar");
    
    items=JSON.parse(sessionStorage.getItem("cart"));
    console.log("Items",items);
  
    listado.innerHTML = '';
    
    let itemsLimpio=[];
    items.forEach((element,indice) => {
        
        if (element.libroId && element.usuarioId ) {
            itemsLimpio.push(element);
        } else {
            console.log("borre " + indice )
            
        };
    });
    
    itemsLimpio.forEach((element,indice) => {
        
        if (element.libroId && element.usuarioId ) {
       
        listado.innerHTML += '<li>' + "Nombre:" + element.libro+ '</li>';
        listado.innerHTML += '<li>' + "Autor:" +element.autor+ '</li>';
        listado.innerHTML += '<li>' + "Precio" +element.precio+ '</li>';
        listado.innerHTML += '<li>' + "Id:" +element.libroId+ '</li>';
        listado.innerHTML += '<li>' + "   "+'</li>';
        } 

        });


			
	

    comprar.addEventListener('click', (req,res) => {
        console.log("compré");
        // http://localhost:3030/api/comprar    
        console.log("items" ,items)
        fetch("http://localhost:3030/api/comprar",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body:JSON.stringify(itemsLimpio),
               });
        
        sessionStorage.clear();
    });
}
        

