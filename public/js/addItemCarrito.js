window.onload =function() {
    //let contItems=sessionStorage.getItem("contItems");
    //console.log("contItems getItem",contItems);

    const addCarrito= document.querySelectorAll('.fa-cart-shopping');
    let cart=sessionStorage.getItem("cart");
    
    
    if (cart==null) {
         cart=[
            {"usuarioId":"",
            "libroId":"",
            "libro":"",
            "autor":"",
            "precio":""}
         ];
         console.log("cart getItem",cart);
         sessionStorage.setItem("cart",JSON.stringify(cart));
       
               }
    
               console.log("cart getItem",cart);
   // if (!contItems) {
     //   let contItems=1;
     //   sessionStorage.setItem("contItems",contItems);
     //   console.log("contItems null",contItems);
       //     }

    for(let i=0; i< addCarrito.length; i++) {
        
        addCarrito[i].addEventListener('click', (req,res) => {
            
            
            
            
            
            //let contItems=parseInt(sessionStorage.getItem("contItems"));
            
            let datos=addCarrito[i].id.split(",")
            console.log("addCarrito[i].id",addCarrito[i].id);
            console.log("datos",datos);
                     
            
            const myObj = {usuarioId: datos[0], libroId: datos[1],
                 libro: datos[2],autor: datos[3], precio: datos[4]};
                
                 const myJSON = JSON.stringify(myObj);
                
                 console.log("myObj",myObj);
                 console.log("myJSON",myJSON);
                let dataCart = sessionStorage.getItem("cart");
                console.log("dataCart",dataCart);
                
                let actualCart = JSON.parse(dataCart);

                

                
                console.log("actualCart",actualCart);
                actualCart.push(myObj);
                json = JSON.stringify(actualCart, null, 2);
                sessionStorage.setItem("cart", json);
            //sessionStorage.setItem("usuarioId"+contItems,datos[0]);
            //sessionStorage.setItem("libroId"+contItems,datos[1]);
            //sessionStorage.setItem("libro"+contItems,datos[2]);
            //sessionStorage.setItem("autor"+contItems,datos[3]);
            //sessionStorage.setItem("precio"+contItems,datos[4]);
            //contItems=contItems+1;
            //sessionStorage.setItem("contItems",contItems);
            //console.log("contItems storage",contItems);
    
        });
    }    
};
