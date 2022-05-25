import fs from 'fs';
import { Container } from '../../containers/containerLocal.js';
import config from '../../config.js';

class ProductList extends Container {
    constructor() {
        super(config.localFile.path_products);
    }
    
    async update(idIn, price, stock){
        const id = parseInt(idIn);
        try {
            const products = await this.getAll();
            const foundIndex = products.findIndex(product => product.id === id);
            if (foundIndex === -1) {
                return false;
            }
            const found = products.splice(foundIndex, 1)[0];
            if (price){
                found.price = price;
            }
            if (stock){
                found.stock = stock;
            }
            products.push(found);
            const newTexto = JSON.stringify(products)
            await fs.promises.writeFile(this.fileName, newTexto);
            return true
        } catch (error) {
            console.log(error);
        }
    }
}

export { ProductList };