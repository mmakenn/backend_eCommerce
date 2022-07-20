/* Server */
import express from 'express'

/* Static, JSON, forms, compression. */
import { setMiddleware } from './components/middleware.js';
/* Session and Passport for authentication */
import { setPassport } from './components/passport.js';
/* Handlebars */
import { setHandlebars } from './components/handlebars.js';
/* Routers */
import { routerCart } from './routers/routerCart.js'
import { routerShop } from './routers/routerShop.js'
import { routerUser } from './routers/routerUser.js'
/* Logger */
import logger from './components/logger.js';

export function createServer(port) {
    const app = express()
    
    setMiddleware(app)
    
    setPassport(app)

    setHandlebars(app)
    
    app.use(routerCart)
    app.use(routerShop)
    app.use(routerUser)

    app.get('*', (req, res) => {
        logger.warn(`Request to URL: ${req.url} with method: ${req.method} is not implemented`)
        res.sendStatus(501)
    })
    
    const connectedServer = httpServer.listen(port, () => {
        logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))
}