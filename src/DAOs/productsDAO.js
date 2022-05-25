let productsModule;
let productsList;

const envOption = process.env.PERS ? process.env.PERS.trim() : process.env.PERS; 

switch (envOption) {
    case 'firebase':
        console.log("Ingreso en Firebase");
        productsModule = await import('./firebase/productsList.js');
        productsList = new productsModule.ProductList();
        break
    case 'mongodb':
        console.log("Ingreso en MongoDB");
        productsModule = await import('./mongo/productsList.js');
        productsList = new productsModule.ProductList();
        break
    default:
        console.log("Ingreso por Default");
        productsModule = await import('./local/productsList.js');
        productsList = new productsModule.ProductList();
        break
}

export { productsList }