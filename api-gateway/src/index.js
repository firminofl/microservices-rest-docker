const express = require('express')
const app = express()
let logger = require('morgan')
const cors = require('cors')


const indexRoute = require('./routes/index')
const { verifyJWT } = require('../src/controllers/jwt-auth')
const { URL_SERVER, PORT, MESSAGE } = require('./ConfigServer')

const whitelist = ['http://localhost:80', 'http://localhost:3001']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

//app.use(cors(corsOptions))

//Sempre deixar o express.json() antes de tudo para converter em JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

//Validar o token antes de acessar a rota desejada
app.use(verifyJWT)
app.use(indexRoute)

app.listen(PORT, () => {
    console.log(`${MESSAGE}`)
})