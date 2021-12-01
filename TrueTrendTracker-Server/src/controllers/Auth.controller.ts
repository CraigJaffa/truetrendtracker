import { Request, Response } from 'express'

import AuthService from '../services/Auth.service'

class AuthController {
	public async login (req: Request, res: Response): Promise<Response> {
		const service = new AuthService()
		const users = await service.login(req.body)
		return res.json(users)
	}

	public async register (req: Request, res: Response): Promise<Response> {
		const service = new AuthService()
		const user = await service.register(req.body)
		return res.json(user)
	}
}

export default new AuthController()
