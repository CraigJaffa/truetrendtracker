import { Router } from 'express'

import UsersController from './controllers/Users.controller'
import AuthController from './controllers/Auth.controller'
import AssetsController from './controllers/Assets.controller'

const routes = Router()

// Users Routes
routes.get('/users', UsersController.list)
routes.get('/user', UsersController.select)
routes.put('/user', UsersController.update)

// Auth Routes
routes.post('/auth/login', AuthController.login)
routes.post('/auth/register', AuthController.register)

// Systems Routes

// Watchlists Routes

// Assets Routes
routes.get('/assets', AssetsController.list)
routes.get('/assets/import', AssetsController.import)

export default routes
