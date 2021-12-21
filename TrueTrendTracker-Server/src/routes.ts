import { Router } from 'express'
import cors from 'cors'

import DefaultController from './controllers/Default.controller'
import UsersController from './controllers/Users.controller'
import AuthController from './controllers/Auth.controller'
import AssetsController from './controllers/Assets.controller'
import WatchlistsController from './controllers/Watchlists.controller'
import SystemsController from './controllers/Systems.controller'

const routes = Router()

const options: cors.CorsOptions = {
	allowedHeaders: [
		'Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'X-Access-Token'
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: process.env.BASE_URL,
	preflightContinue: false
}

// config
routes.use(cors(options))

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

// preflight
routes.options('*', cors(options))

export default routes
