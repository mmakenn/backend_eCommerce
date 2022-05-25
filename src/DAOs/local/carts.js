import fs from 'fs';
import { Container } from '../../containers/containerLocal.js';

class ShoppingCarts extends Container {
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


export { ShoppingCarts };