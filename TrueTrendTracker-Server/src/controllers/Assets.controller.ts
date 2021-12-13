import { Request, Response } from 'express'

import AssetsService from '../services/Assets.service'
import Assets from '../schemas/Assets'

class AssetsController {
	public async list (req: Request, res: Response): Promise<Response> {
		const service = new AssetsService()
		const assets = await service.listAssets()
		return res.json(assets)
	}

	public async get (req: Request, res: Response): Promise<Response> {
		const service = new AssetsService()
		const asset = await service.getAsset(req.params.symbol)
		return res.json(asset)
	}

	public async import (req: Request, res: Response): Promise<Response> {
		const max = 22
		await Assets.deleteMany({})

		async function getRecords (counter: number) {
			const service = new AssetsService()
			const assets = await service.importAssets(400, counter)

			for (let index = 0; index < assets.data.data.length; index++) {
				const element = assets.data.data[index]
				await Assets.findOneAndUpdate({ symbol: element.symbol }, {
					name: element.name,
					symbol: element.symbol,
					slug: element.slug
				}, { new: true, upsert: true })
			}

			if (counter < max) {
				setTimeout(() => {
					counter++
					getRecords(counter)
				}, 5000)
			}
		}

		getRecords(1)

		return res.json({ status: 'Completed!' })
	}
}

export default new AssetsController()
