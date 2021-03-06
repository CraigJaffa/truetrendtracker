import { Router } from 'express'
import cors from 'cors'

import DefaultController from './controllers/Default.controller'
import UsersController from './controllers/Users.controller'
import AuthController from './controllers/Auth.controller'
import AssetsController from './controllers/Assets.controller'
import WatchlistsController from './controllers/Watchlists.controller'
import SystemsController from './controllers/Systems.controller'

const routes = Router()

// config
routes.options('*', cors())

// Default
routes.get('/', DefaultController.default)

// Users Routes
routes.get('/users', UsersController.list)
routes.get('/user', UsersController.select)
routes.post('/user', UsersController.create)
routes.put('/user', UsersController.update)

// Auth Routes
routes.post('/auth/login', AuthController.login)
routes.post('/auth/register', AuthController.register)

// Systems Routes
routes.post('/systems', SystemsController.create)
routes.get('/systems/:id', SystemsController.get)

// Watchlists Routes
routes.post('/watchlist', WatchlistsController.create)
routes.get('/watchlist/:id/:type?', WatchlistsController.get)

// Assets Routes
routes.get('/assets', AssetsController.list)
routes.get('/asset/:symbol', AssetsController.get)
routes.get('/assets/import', AssetsController.import)

export default routes
