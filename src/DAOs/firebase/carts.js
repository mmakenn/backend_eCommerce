import { ContainerFirebase } from "../../containers/containerFirebase.js";

async function updateAndResolve(collection, id, newProductsArray){
    try {
        const doc = collection.doc(id);
        const product = await doc.get();
        const productData = product.data();
        await doc.update({ products: newProductsArray });    
        if (productData == undefined) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
}

class ShoppingCarts extends ContainerFirebase {
    constructor(){
        super("carts");
    }
    
    async addCart() {
        try {
            const doc = this.collection.doc();
            await doc.create({ products: [] });
            return doc.id;
        } catch (error) {
            console.log(error);
        }
    }
    
    async save(idCart, product) {
        const cart = await super.getById(idCart);
        if (! cart) {
            return false;
        }
        const products = cart.products;
        products.push(product);
        return updateAndResolve(this.collection, idCart, products); 
    }

    async reset(idCart) {
        return updateAndResolve(this.collection, idCart, []);
    }

    async deleteProductFromCartId(idCart, idProduct) {
        const cart = await super.getById(idCart);
        if (! cart) {
            return false;
        }
        const products = cart.products;
        const index = products.findIndex(product => product.id === idProduct);
        if (index === -1) {
            return false;
        }
        products.splice(index, 1);
        return updateAndResolve(this.collection, idCart, products);
    }
}

export { ShoppingCarts };