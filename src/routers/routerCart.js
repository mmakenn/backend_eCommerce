const { Router } = require('express');
const { Cart } = require('../components/cart');
const router = new Router();

const carts = [];
let totalCarts = 1;

function createFileName(id){
    return `./src/data/cartId${id}.txt`;
}

async function pushUserProducts(id, res){
    const found = carts.find(cart => cart.getId() === id);
    if (found){
        const products = await found.getAll();
        res.status(200).json( {products: products} );
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
}

async function deleteUserProduct(cartId, productId, res){
    const found = carts.find(cart => cart.getId() === cartId);
    if (found){
        const deleteStatus = await found.deleteById(productId);
        if (deleteStatus){
            res.status(200).json( {ok: `Product id: ${productId} deleted from cart id: ${cartId}` } );
        } else {
            res.status(400).json( {error: "Product id not found"} );    
        }
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
}

/* -------------------------------------------------- */
router.post('/', (req, res) => {
    const fileName = createFileName(totalCarts);
    const cart = new Cart(totalCarts, fileName);
    carts.push(cart);
    totalCarts++;
    res.status(201).json( {cartId: totalCarts} );
});

router.post('/:id/productos', (req, res) =>{
    const { params, body } = req;
    const id = parseInt(params.id);
    const found = carts.find(cart => cart.getId() === id);
    if (found){
        found.save(body);
        res.sendStatus(200);
    } else {
        res.status(400).json( {error: "Cart id not found"} );
    }
});

router.get('/:id/productos', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);
    pushUserProducts(id, res);
});

router.delete('/:id/productos/:id_prod',  (req, res) => {
    const { params } = req;
    const cartId = parseInt(params.id);
    const productId = parseInt(params.id_prod);
    deleteUserProduct(cartId, productId, res);
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