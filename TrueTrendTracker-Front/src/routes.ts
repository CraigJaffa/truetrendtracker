import { Router } from 'express'
import SessionController from './controllers/SessionController'
import JobsController from './controllers/JobsController'

const routes = Router()

// Session Root
routes.get('/', SessionController.status)

// Jobs Sections
routes.get('/jobs', JobsController.list)
routes.get('/jobs/register', JobsController.register)

export default routes
