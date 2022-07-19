import admin from 'firebase-admin';
import fs from 'fs'
import config from '../config.js';

const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.credentials, 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebase.url
});

const db = admin.firestore();

class ContainerFirebase {
    constructor(collecName) {
        this.collection = db.collection(collecName)
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            const products = snapshot.docs;
            const productsList = products.map(
                (product) => (
                    {
                        id: product.id,
                        ...product.data()
                    }
                )
            )
            return productsList;
        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        try {
            const doc = this.collection.doc();
            await doc.create(product);
            return doc.id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(idIn) {
        try {
            const doc = this.collection.doc(idIn);
            const product = await doc.get();
            const productData = product.data();
            if (productData == undefined) {
                return null;
            }
            return {id: product.id, ...productData};
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(idIn) {
        try {
            const doc = this.collection.doc(idIn);
            const product = await doc.get();
            const productData = product.data();
            await doc.delete();
            if (productData == undefined) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async close() {
        
    }
}

export { ContainerFirebase };