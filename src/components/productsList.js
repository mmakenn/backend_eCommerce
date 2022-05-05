const fs = require('fs');
const { Container } = require('./Container');

class ProductList extends Container {
    
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

module.exports = {ProductList};