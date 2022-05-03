class Product {
    constructor(name, description, img, price, stock){
        this.id = -1;
        this.name = name;
        this.description = description;
        this.img = img;
        this.price = price;
        this.stock = stock;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    changeStock(n){
        this.stock = this.stock + n;
    }
    
    changePrice(newPrice){
        this.price = newPrice;
    }
}

module.exports = {Product}