export function getToken(){
    return JSON.parse(localStorage.getItem("user"))?.token || ""
}

export function logOutUser(){
    localStorage.removeItem("user");
}

export function getUserId(){
    return JSON.parse(localStorage.getItem("user")).id;
}

export function isModerator(){
    return JSON.parse(localStorage.getItem("user")).isModerator;
}

export function addProductToBasket(product){
   if(localStorage.getItem("product")){
    let products = JSON.parse(localStorage.getItem("product"));
    products.push(product);
    localStorage.setItem("product",JSON.stringify(products));
    return;
   }
   localStorage.setItem("product",JSON.stringify([product]));
}

export function getItemsFromBasket(){
    return JSON.parse(localStorage.getItem("product"))
}

export function removeItemFromBasket(id){
    let products = JSON.parse(localStorage.getItem("product"));
    
    let i = 0;

    for (let index = 0; index < products.length; index++) {
        if(products._id === id){
          i = index;
        }
    }

    products.splice(i,1);

    localStorage.setItem("product",JSON.stringify(products));

    return products
}

export function checkIfProductIsAdded(product){
    let products = JSON.parse(localStorage.getItem("product"));
    let isFound = false;
    
    for (let index = 0; index < products?.length; index++) {
        if(products[index]._id === product._id){
            isFound = true;
            break;
        }
    }

    return isFound;
}

export function clearBasket(){
    localStorage.removeItem("product");
}

export function isBasketEmpty(){
    let products = JSON.parse(localStorage.getItem("product"));
    if(products){
        return true;
    }
    return false;
}