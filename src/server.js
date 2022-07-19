import express from 'express';
import { router as routerCart } from './routers/routerCart.js';
import { router as routerShop } from './routers/routerShop.js';

const app = express();

//--------------------------------------------
// agrego middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------
// agrego routers
app.use('/api/productos', routerShop);
app.use('/api/carrito', routerCart);

export default app;