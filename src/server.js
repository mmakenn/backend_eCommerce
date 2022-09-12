/* Server */
import express from 'express'

import { closeDatabaseConnection } from './controllers/databaseConnectionHandler.js';
/* Session and Passport for authentication */
import { sessionHandler } from './middlewares/session.js'
import { passportAuthentication, passportSession} from './middlewares/passport.js';
/* Routers */
import { routerCarts } from './routers/carts.js';
import { routerImages } from './routers/images.js';
import { routerLogin } from './routers/login.js';
import { routerNotImplemented } from './routers/notImplemted.js';
import { routerOrders } from './routers/orders.js';
import { routerProducts } from './routers/products.js';
import { routerUser } from './routers/users.js';
/* Logger */
import logger from './misc/logger.js';

export function createServer(port) {
    const app = express()
    
    app.use(express.json())
    app.use(express.urlencoded( { extended: true } ))
    app.use('/public', express.static('public'))

    app.use(sessionHandler)
    
    app.use(passportAuthentication)
    app.use(passportSession)
    
    app.use('/', routerLogin)
    app.use('/api', routerImages)
    app.use('/api', routerUser)
    app.use('/api', routerProducts)
    app.use('/api', routerCarts)
    app.use('/api', routerOrders)
    app.use('/', routerNotImplemented)

    const connectedServer = app.listen(port, () => {
        logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    
    connectedServer.on('error', error => {
        closeDatabaseConnection()
        logger.error(`Error en servidor ${error}`)
    })
}