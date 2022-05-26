import fs from 'fs';
import { Container } from '../../containers/containerLocal.js';
import config from '../../config.js';

async function updateAndResolve(thisObj, idCart, newProducts) {
    const id = parseInt(idCart);
    try {
        const carts = await thisObj.getAll();
        const foundIndex = carts.findIndex(cart => cart.id === id);
        if (foundIndex === -1) {
            return false;
        }
        const foundCart = carts.splice(foundIndex, 1)[0];
        foundCart.products = newProducts;
        carts.push(foundCart);
        const newTexto = JSON.stringify(carts);
        await fs.promises.writeFile(thisObj.fileName, newTexto);
        return true
    } catch (error) {
        console.log(error);
    }
}

class ShoppingCarts extends Container {
    constructor() {
        super(config.localFile.path_carts);
    }

    async addCart() {
        const id = await super.save( { products: [] } );
        return id;
    }

    async save(idIn, product) {
        const id = parseInt(idIn);
        const cart = await super.getById(id);
        if (! cart) {
            return false;
        }
        cart.products.push(product);
        return updateAndResolve(this, idIn, cart.products);
    }

    async reset(idIn) {
        const id = parseInt(idIn);
        return updateAndResolve(this, idIn, []);
    }

    async deleteProductFromCartId(idCartIn, idProductIn) {
        const idCart = parseInt(idCartIn);
        const cart = await super.getById(idCart);
        const foundIndex = cart.products.findIndex(product => product.id === idProductIn);
        if (foundIndex === -1) {
            return false;
        }
        cart.products.splice(foundIndex, 1);
        return updateAndResolve(this, idCart, cart.products);
    }
}


export { ShoppingCarts };