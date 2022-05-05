/* El router base '/api/carritos' implementará cinco rutas, disponibles para usuarios y
administradores:
a. POST: '/' - Crea un carrito y devuelve su id.
b. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
d. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de
producto
e. DELETE: '/:id' - Vacía un carrito. */
const express = require('express');
const { Cart } = require('../components/cart');
const router = express.Router();

const carts = [];

router.post('/', (req, res) => {
    let newId = 1;
    if (carts.length > 0 ){
        newId = carts[carts.length - 1].id + 1;
    }
    const cart = new Cart(newId);
    carts.push(cart);
    res.status(201).json( {cartId: newId} );
});

router.post('/:id/productos', (req, res) =>{
    const { params, body } = req;
    const id = parseInt(params.id);
    const found = carts.find(cart => cart.getId() === id);
    if (found){
        const product = new Product(body.name, body.description, body.img, body.price, body.stock);
        found.save(product);
        res.sendStatus(200);
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
});

router.get('/:id/productos', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);
    const found = carts.find(cart => cart.getId() === id);
    if (found){
        res.status(200).json( {products: found.getAll()} );
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
});

router.delete('/:id/productos/:id_prod',  (req, res) => {
    const { params } = req;
    const cartId = parseInt(params.id);
    const found = carts.find(cart => cart.getId() === cartId);
    if (found){
        const productId = parseInt(params.id_prod);
        const deleteStatus = found.deleteById(productId);
        if (deleteStatus){
            res.status(200).json( {ok: `Product id: ${productId} deleted from cart id: ${cartId}` } );
        } else {
            res.status(400).json( {error: "Product id not found"} );    
        }
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
});

router.delete('/:id',  (req, res) => {
    const { params } = req;
    const cartId = parseInt(params.id);
    const found = carts.find(cart => cart.getId() === cartId);
    if (found){
        found.reset();
        res.status(200).json( {ok: `Cart id: ${cartId} cleaned` } );
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
});

router.all('*', (req, res) => {
    const { url, method } = req;
    res.status(501).json( {error: `Method: ${method} not implemented for requested url: ${url}`} );
});

module.exports = router;