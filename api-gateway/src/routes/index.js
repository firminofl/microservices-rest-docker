const { Router } = require('express')

const routes = Router()
const httpProxy = require('express-http-proxy')
const coreProxy = httpProxy('http://localhost:3000');

routes.get('/', (req, res, next) => {
    coreProxy(req, res, next);
})

module.exports = routes