/* El router base '/api/productos' implementará cinco funcionalidades:
a. GET: '/' - Me permite listar todos los productos disponibles (disponible para todes)
b. GET: '/:id' - Me permite listar un producto por su id (disponible para todes)
c. POST: '/' - Para incorporar productos al listado (disponible solo para administradores)
d. PUT: '/:id' - Actualiza un producto por su id (disponible solo para administradores)
e. DELETE: '/:id' - Borra un producto por su id (disponible solo para administradores) */
const { Router } = require('express');
const { ProductList } = require('../components/productsList');
const router = new Router();
const adminUser = true;

const productsList = new ProductList();

function checkContent(products){
    return (products.length > 0);
}

router.get('/', (req, res) => {
    const products = productsList.getAll();
    const areProducts = checkContent(products);
    if (areProducts){
        res.status(200).json( {products: products} );
    } else {
        res.status(204).json( {error: 'No content'} );
    }
});

router.get('/:id', (req, res) => {
    const { params } = req;
    const found = productsList.getById(params.id);
    if (found){
        res.status(200).json( {product: found} );
    } else {
        res.status(204).json( {error: 'No content'} );
    }
});

function checkUser(req, res, next) {
    if (adminUser) {
        next();
    } else {
        res.sendStatus(401);
    }
}

router.post('/', checkUser, (req, res) => {
    const { body } = req;
    const product = new Product(body.name, body.description, body.img, body.price, body.stock);
    const id = productsList.save(product);
    res.status(201).json( {id: id} );
});

router.put('/:id', checkUser, (req, res) => {
    const { body, params } = req;
    const result = productsList.update(params.id, body.price, body.stock);
    if (result){
        res.sendStatus(200);
    } else {
        res.status(304).json( {error: `Product id: ${params.id} not found`} );
    }
})

router.delete('/:id', checkUser, (req, res) => {
    const { params } = req;
    const result = productsList.deleteById(params.id);
    if (result){
        res.sendStatus(200);
    } else {
        res.status(304).json( {error: `Product id: ${params.id} not found`} );
    }
});

router.all('*', (req, res) => {
    const { url, method } = req;
    res.status(501).json( {error: `Method: ${method} not implemented for requested url: ${url}`} );
});

module.exports = router;