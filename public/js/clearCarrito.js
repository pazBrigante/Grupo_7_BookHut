window.onload =function() {
  
    const clearCarritoLogout= document.querySelector('#logout');
    const clearCarritoLogin = document.querySelector('#login');
    console.log("Clear Carrito");

    if (clearCarritoLogout) {
    clearCarritoLogout.addEventListener('click', () => {
        
        sessionStorage.clear();
  
    
    });
    };
    if (clearCarritoLogin) {
    clearCarritoLogin.addEventListener('click', () => {
                sessionStorage.clear();
      
    
    });
}  
       
    
};