import Authentication from '../controllers/authentication'
import Middlewares from './middlewares'
import api from './api'

import User from '../models/user'
import Asset from '../models/asset'

const router = require('express').Router()

router.use('/api', Middlewares.loginRequired, api)
router.post('/signup', Authentication.signup)
router.post('/signin', Authentication.signin)
router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.json({'source': 'https://github.com/variablelabs/core'}))

// Add '/api' to each route to protect
router.get('/asset', (req, res) => {
    return res.status(200).send({
        success: true,
    });
})
router.post('/asset/create', (req, res) => {
    return res.status(200).send({
        success: true,
    });
})
router.post('/asset/modify', (req, res) => {
    return res.status(200).send({
        success: true,
    });
})

export default router;