const fs = require('fs');

class Cart{
    constructor(id, fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    getId(){
        return this.id;
    }

    async getAll() {
        try {
            const texto = await fs.promises.readFile(this.fileName, {encoding: 'utf-8', flag: 'a+'});
            if (texto === "") {
                return [];
            }
            return JSON.parse(texto); 
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            const products = await this.getAll();
            const newId = products.length + 1;
            product.id = newId;
            products.push(product);
            const newTexto = JSON.stringify(products)
            await fs.promises.writeFile(this.fileName, newTexto);
            return newId;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(idIn) {
        const id = parseInt(idIn);
        try {
            const products = await this.getAll();
            const found = products.find(product => product.id === id);
            return found ? found : null;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(idIn) {
        const id = parseInt(idIn);
        try {
            const products = await this.getAll();
            const foundIndex = products.findIndex(product => product.id === id);
            if (foundIndex === -1) {
                return false;
            }
            products.splice(foundIndex, 1);
            const newTexto = JSON.stringify(products)
            await fs.promises.writeFile(this.fileName, newTexto);
            return true
        } catch (error) {
            console.log(error);
        }
    }

    async reset() {
        try {
            await fs.promises.writeFile(this.fileName, "");
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = {Cart};