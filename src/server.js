const express = require('express');
const routerShop = require('./routers/routerShop');
const routerCart = require('./routers/routerCart');

const app = express();

//--------------------------------------------
// agrego middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------
// agrego routers
app.use('/api/productos', routerShop);
app.use('/api/carrito', routerCart);

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));