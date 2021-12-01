import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import * as dotenv from 'dotenv'

import routes from './routes'

dotenv.config({ path: path.join(__dirname, '../.env') })

class App {
	public express: express.Application

	constructor () {
		this.express = express()

		this.middlewares()
		this.database()
		this.routes()
		this.prepareStatic()
		this.setViewEngine()
	}

	private middlewares (): void {
		this.express.use(express.urlencoded({ extended: false }))
		this.express.use(express.json())
		this.express.use(cors())
	}

	private prepareStatic (): void {
		this.express.use('/', express.static(path.join(__dirname, '/public')))
	}

	private setViewEngine (): void {
		this.express.set('view engine', 'hbs')
		this.express.set('views', path.join(__dirname, '/public'))
	}

	private database (): void {
		mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_MAIN}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
	}

	private routes (): void {
		this.express.use(routes)
	}
}

export default new App().express
