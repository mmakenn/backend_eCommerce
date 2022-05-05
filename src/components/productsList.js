class ProductList{
    constructor() {
        this.products = [];
    }

    getAll() {
        return this.products; 
    }

    save(product) {
        let newId = 1;
        if (this.products.length > 0 ){
            newId = this.products[this.products.length - 1].id + 1;
        }
        product.id = newId;
        this.products.push(product);
        return newId;
    }

    update(id, price, stock){
        const idNumber = parseInt(id);
        const found = this.getById(idNumber);
        if (! found){
            return false;
        }

        if (price){
            found.price = price;
        }
        if (stock){
            found.stock = stock;
        }
        return true;    
    }

    getById(id) {
        const idNumber = parseInt(id);
        const found = this.products.find(product => product.id === idNumber);
        return found ? found : null;
    }

    deleteById(id) {
        const idNumber = parseInt(id);
        const foundIndex = this.products.findIndex(product => product.id === idNumber);
        if (foundIndex === -1) {
            return false;
        }
        this.products.splice(foundIndex, 1);
        return true
    }
}


module.exports = {ProductList};