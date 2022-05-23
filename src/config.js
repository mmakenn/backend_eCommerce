//const fileName = './src/data/local/products.txt';
//const productsList = new ProductList(fileName);
export default {
    localFile: {
        path: ''
    },
    mongoDB: {
        urlServer: 'mongodb+srv://mmakenn:coderhouse@cluster0.6zovj.mongodb.net/coderhouse-proyect?retryWrites=true&w=majority',
        options: {
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        
    }
}