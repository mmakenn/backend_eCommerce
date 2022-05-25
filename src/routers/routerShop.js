import { Router } from 'express';
import { ProductList } from '../DAOs/local/productsList.js';

const router = new Router();
const adminUser = true;

const productsList = new ProductList();

function checkContent(products){
    return (products.length > 0);
}

function checkUser(req, res, next) {
    if (adminUser) {
        next();
    } else {
        res.sendStatus(401);
    }
}

async function pushProducts(res){
    const products = await productsList.getAll();
    const areProducts = checkContent(products);
    if (areProducts){
        res.status(200).json( {products: products} );
    } else {
        res.status(204).json( {error: 'No content'} );
    }
}

async function pushProductsById(params, res){
    const found = await productsList.getById(params.id);
    if (! found){
        res.status(204).json( {error: 'No content'} );
    } else {
        res.status(200).json( {product: found} );
    }
}

async function getUserInput(body, res) {
    const id = await productsList.save(body);
    res.status(201).json( {id: id} );
}

async function getUserUpdate(body, params, res){
    const result = await productsList.update(params.id, body.price, body.stock);
    if (result){
        res.sendStatus(200);
    } else {
        res.status(304).json( {error: `Product id: ${params.id} not found`} );
    }
}

async function deleteProduct(params, res){
    const result = await productsList.deleteById(params.id);
    if (result){
        res.sendStatus(200);
    } else {
        res.status(304).json( {error: `Product id: ${params.id} not found`} );
    }
}

/* -------------------------------------------------------- */
router.get('/', (req, res) => {
    pushProducts(res);
});

router.get('/:id', (req, res) => {
    const { params } = req;
    pushProductsById(params, res);
});

router.post('/', checkUser, (req, res) => {
    const { body } = req;
    getUserInput(body, res);
});

router.put('/:id', checkUser, (req, res) => {
    const { body, params } = req;
    getUserUpdate(body, params, res);
});

router.delete('/:id', checkUser, (req, res) => {
    const { params } = req;
    deleteProduct(params, res);
});

router.all('*', (req, res) => {
    const { url, method } = req;
    res.status(501).json( {error: `Method: ${method} not implemented for requested url: ${url}`} );
});

export { router };