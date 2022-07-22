import logger from '../middleware/logger.js'
import { auth } from '../middleware/authUser.js'
import { Router } from 'express'
import { uploadFile } from '../middleware/multer.js'
import passport from 'passport'
const routerUser = new Router()

routerUser.get('/register', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: false})
})

routerUser.get('/failRegister', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: true})
})

routerUser.get('/login', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: false})
})

routerUser.get('/failLogin', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: true})
})

routerUser.get('/logout', auth, (req, res, next) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    if (req.isAuthenticated()) {
        const username = req.user.username
        req.logout((err) => {
            if (err) {
                return next(err)
            }
        })
        res.render('logOut', {user: username})
    } else {
        res.render('logOut', {user: ""})
    }
})

routerUser.post('/register', uploadFile,
    passport.authenticate('register', { 
        failureRedirect: '/failRegister',
        successRedirect: '/login'
    })
)

routerUser.post('/login', 
    passport.authenticate('login', { 
        failureRedirect: '/failLogin',
        successRedirect: '/api/productos'
    })
)

export { routerUser }