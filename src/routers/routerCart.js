import { Router } from 'express';
import { ShoppingCarts } from '../DAOs/firebase/carts.js';

const router = new Router();
const carts = new ShoppingCarts();

router.post('/', (req, res) => {
    carts.addCart()
        .then(
            newId => {
                res.status(201).json( { cartId: newId } );
            }
        );
});

router.post('/:id/productos', (req, res) =>{
    const { params, body } = req;
    carts.save(params.id, body)
        .then(foundCart => {
            if (foundCart){
                res.sendStatus(200);
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

router.get('/:id/productos', (req, res) => {
    const { params } = req;
    carts.getById(params.id)
        .then(foundCart => {
            if (foundCart){
                res.status(200).json( {products: foundCart.products} );
            } else {
                res.status(400).json( {error: "Cart or Product id not found"} );
            }
        });
});

router.delete('/:id/productos/:id_prod',  (req, res) => {
    const { params } = req;
    carts.deleteProductFromCartId(params.id, params.id_prod)
        .then(foundCart => {
            if (foundCart){
                res.sendStatus(200);
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

router.delete('/:id',  (req, res) => {
    const { params } = req;
    carts.reset(params.id)
        .then(cartFound => {
            if (cartFound) {
                res.status(200).json( {ok: `Cart id: ${params.id} cleaned` } );
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

router.all('*', (req, res) => {
    const { url, method } = req;
    res.status(501).json( {error: `Method: ${method} not implemented for requested url: ${url}`} );
});

export { router };