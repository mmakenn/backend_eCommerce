import { Router } from 'express';
import { productsList } from '../DAOs/resolveDAO.js';

const router = new Router();
const ADMIN_USER = true;

function checkContent(products){
    return (products.length > 0);
}

function checkUser(req, res, next) {
    if (ADMIN_USER) {
        next();
    } else {
        res.sendStatus(401);
    }
}

/* -------------------------------ROUTER------------------------------- */
router.get('/', (req, res) => {
    productsList.getAll()
        .then(products => {
            const areProducts = checkContent(products);
            if (areProducts){
                res.status(200).json( {products: products} );
            } else {
                res.status(204).json( {error: 'No content'} );
            }
        });
});

router.get('/:id', (req, res) => {
    const { params } = req;
    productsList.getById(params.id)
        .then(found => {
            if (! found){
                res.status(204).json( {error: 'No content'} );
            } else {
                res.status(200).json( {product: found} );
            }
        });
});

router.post('/', checkUser, (req, res) => {
    const { body } = req;
    productsList.save(body)
        .then(id => {
            res.status(201).json( {id: id} );
        })
});

router.put('/:id', checkUser, (req, res) => {
    const { body, params } = req;
    productsList.update(params.id, body.price, body.stock)
        .then(result => {
            if (result){
                res.sendStatus(200);
            } else {
                res.status(304).json( {error: `Product id: ${params.id} not found`} );
            }
        });
});

router.delete('/:id', checkUser, (req, res) => {
    const { params } = req;
    productsList.deleteById(params.id)
        .then(result => {
            if (result){
                res.sendStatus(200);
            } else {
                res.status(304).json( {error: `Product id: ${params.id} not found`} );
            }
        })
});

router.all('*', (req, res) => {
    const { url, method } = req;
    res.status(501).json( {error: `Method: ${method} not implemented for requested url: ${url}`} );
});

export { router };