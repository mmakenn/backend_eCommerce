/* dos conjuntos de rutas agrupadas en routers, uno con la url base '/api/productos' y el otro
con '/api/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción
en glitch.com
>>Aspectos a incluir en el entregable:
Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema
de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de
recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error :
-1, descripcion: ruta 'x' método 'y' no autorizada }

Realizar la persistencia de productos y del carrito de compras en el filesystem.

En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El
servidor no debe generar ninguna vista.
En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto
de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router,
lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas.
Utilizar preferentemente clases, constructores de variables let y const y arrow function.
5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch. */

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