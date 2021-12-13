import { Request, Response } from 'express'

import WatchlistService from '../services/Watchlist.service'

class WatchlistController {
	public async create (req: Request, res: Response): Promise<Response> {
		const service = new WatchlistService()
		const watchlist = await service.updateWatchlist(req.body)
		return res.json(watchlist)
	}

	public async get (req: Request, res: Response): Promise<Response> {
		const service = new WatchlistService()
		const watchlist = await service.getWatchlist(req.params.id, req.params.type)
		return res.json(watchlist)
	}
}

export default new WatchlistController()
