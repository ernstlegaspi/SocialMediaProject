import express from 'express'

import { login, register } from '../controllers/user'

const route = express.Router()

route.post('/login', login)
route.post('/', register)

export default route
