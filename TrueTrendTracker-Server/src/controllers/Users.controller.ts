import { Request, Response } from 'express'

import UsersService from '../services/Users.service'

class UsersController {
	public async list (req: Request, res: Response): Promise<Response> {
		const service = new UsersService()
		const users = await service.findUsers()
		return res.json(users)
	}

	public async select (req: Request, res: Response): Promise<Response> {
		const service = new UsersService()
		const user = await service.getUser(req.body._id)
		return res.json(user)
	}

	public async update (req: Request, res: Response): Promise<Response> {
		const service = new UsersService()
		const user = await service.updateUser(req.body)
		return res.json(user)
	}
}

export default new UsersController()
