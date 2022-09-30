window.onload =function() {
    
    
    //let contItems=sessionStorage.getItem("contItems");
    const listado= document.querySelector("#listado");
    //console.log("contItems getItem",contItems);
    //item=sessionStorage.getItem("contItem");
    //console.log("Item",item);
    items=JSON.parse(sessionStorage.getItem("cart"));
    console.log("Items",items);

    
    listado.innerHTML = '';
    items.forEach(element => {
        
        if (element.libroId) {
       
        listado.innerHTML += '<li>' + "Nombre:" + element.libro+ '</li>';
        listado.innerHTML += '<li>' + "Autor:" +element.autor+ '</li>';
        listado.innerHTML += '<li>' + "Precio" +element.precio+ '</li>';
        listado.innerHTML += '<li>' + "Id:" +element.libroId+ '</li>';
        listado.innerHTML += '<li>' + "   "+'</li>';
            }
			
	});
          
        };
    
