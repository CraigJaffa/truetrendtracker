import { Request, Response } from 'express'

class SessionsController {
	public async status (req: Request, res: Response): Promise<Response> {
		return res.json('Working!')
	}
}

export default new SessionsController()
