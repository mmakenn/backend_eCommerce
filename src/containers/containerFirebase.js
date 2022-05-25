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
        this.coleccion = db.collection(collecName)
    }

    async getAll() {
        try {
            const snapshot = await this.coleccion.get();
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
            const doc = this.coleccion.doc();
            await doc.create(product);
            return doc.id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(idIn) {
        try {
            const doc = this.coleccion.doc(idIn);
            const product = await doc.get();
            const productObj = {
                                id: product.id,
                                ...product.data()};
            return productObj;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(idIn) {
        try {
            const doc = this.coleccion.doc(idIn);
            const product = await doc.get();
            const data = product.data();
            await doc.delete();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

export { ContainerFirebase };