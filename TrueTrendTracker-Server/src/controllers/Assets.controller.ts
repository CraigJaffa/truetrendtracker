import { Request, Response } from 'express'

import AssetsService from '../services/Assets.service'

class AssetsController {
	public async list (req: Request, res: Response): Promise<Response> {
		const service = new AssetsService()
		const assets = await service.listAssets()
		return res.json(assets)
	}

	public async import (req: Request, res: Response): Promise<Response> {
		const service = new AssetsService()
		const assets = await service.importAssets()
		return res.json(assets.data)
	}
}

export default new AssetsController()
