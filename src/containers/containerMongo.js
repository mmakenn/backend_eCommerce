import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongoDB.urlServer, config.mongoDB.options)

class ContainerMongo {
    constructor(collecName, schema) {
        this.collection = mongoose.model(collecName, schema);
    }

    async getAll() {
        const all = await this.collection.find({});
        return all;
    }

    async save(product) {
        try {
            const info = await this.collection.create(product);
            return info.id;
        } catch (err) {
            console.log('Error, not saved.')
        }
    }

    async getById(idIn) {
        const products = await this.collection.find({_id: idIn});
        if (products.length == 0) {
            return null;
        }
        return products[0];
    }

    async deleteById(idIn) {
        const info = await this.collection.deleteOne({_id: idIn});
        if (info.deletedCount == 0){
            return false;
        }
        return true;
    }

    async close() {
        await mongoose.disconnect();
    }
}

export { ContainerMongo };