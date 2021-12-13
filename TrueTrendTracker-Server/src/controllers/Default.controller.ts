import { Request, Response } from 'express'

class DefaultController {
	public async default (req: Request, res: Response): Promise<Response> {
		return res.json('Server Running!')
	}
}

export default new DefaultController()
