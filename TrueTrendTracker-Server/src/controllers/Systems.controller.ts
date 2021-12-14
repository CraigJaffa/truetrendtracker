import { Request, Response } from 'express'

import SystemsService from '../services/Systems.service'

class SystemsController {
	public async get (req: Request, res: Response): Promise<Response> {
		const service = new SystemsService()
		const systems = await service.getSystems(req.params.id)
		return res.json(systems)
	}

	public async create (req: Request, res: Response): Promise<Response> {
		const service = new SystemsService()
		const systems = await service.updateSystem(req.body)
		return res.json(systems)
	}
}

export default new SystemsController()
