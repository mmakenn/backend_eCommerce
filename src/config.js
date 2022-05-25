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
        credentials: "./src/data/coderhouse-backend-89c90-firebase-adminsdk-z2vh7-94abfe383b.json",
        url: "https://coderhouse-backend89c90-.firebaseio.com"
    }
}