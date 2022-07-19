let productsModule;
let productsList;

let cartsModule;
let carts;

const envOption = process.env.PERS ? process.env.PERS.trim() : process.env.PERS; 

switch (envOption) {
    case 'firebase':
        console.log("Ingreso en Firebase");

        productsModule = await import('./firebase/productsList.js');
        productsList = new productsModule.ProductList();
        
        cartsModule = await import('./firebase/carts.js');
        carts = new cartsModule.ShoppingCarts();
        break
    case 'mongodb':
        console.log("Ingreso en MongoDB");

        productsModule = await import('./mongo/productsList.js');
        productsList = new productsModule.ProductList();
        
        cartsModule = await import('./mongo/carts.js');
        carts = new cartsModule.ShoppingCarts();
        break
    default:
        console.log("Ingreso por Default");

        productsModule = await import('./local/productsList.js');
        productsList = new productsModule.ProductList();

        cartsModule = await import('./local/carts.js');
        carts = new cartsModule.ShoppingCarts();
        break
}

export { productsList, carts }