const fs = require('fs');
const { Container } = require('./Container');

class Cart extends Container {
    constructor(id, fileName) {
        super(fileName);
        this.id = id;
    }

    getId(){
        return this.id;
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