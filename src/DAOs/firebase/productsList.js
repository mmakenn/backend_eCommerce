import { ContainerFirebase } from "../../containers/containerFirebase.js";

class ProductList extends ContainerFirebase{
    constructor() {
        super("products");
    }

    async update(idIn, price, stock){
        try {
            const doc = this.coleccion.doc(idIn);
            const product = await doc.get();
            await doc.update(
                {
                    price: price,
                    stock: stock
                }
            );
            return product.data();
        } catch (error) {
            console.log(error);
        }
        /* if () {
            return false;
        }
        return true; */
    }
}

export { ProductList }