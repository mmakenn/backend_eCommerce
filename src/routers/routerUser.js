import logger from '../components/logger.js'
import { auth } from '../components/authUser.js'
import { Router } from 'express'
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
    res.render('logOut', {user: username})
    // if (req.isAuthenticated()) {
    //     const username = req.user.username
    //     req.logout((err) => {
    //         if (err) {
    //             return next(err)
    //         }
    //     })
    //     res.render('logOut', {user: username})
    // } else {
    //     res.render('logOut', {user: ""})
    // }
})

export { routerUser }