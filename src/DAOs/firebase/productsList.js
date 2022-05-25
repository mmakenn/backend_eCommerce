import { ContainerFirebase } from "../../containers/containerFirebase.js";

class ProductList extends ContainerFirebase{
    constructor() {
        super("products");
    }

    async update(idIn, price, stock){
        try {
            const doc = this.coleccion.doc(idIn);
            const product = await doc.get();
            const productData = product.data();
            if (price) {
                await doc.update({ price: price });    
            }
            if (stock) {
                await doc.update({ stock: stock });
            }
            if (productData == undefined) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}

export { ProductList }