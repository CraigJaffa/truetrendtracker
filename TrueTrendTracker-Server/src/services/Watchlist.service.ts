import IError from '../interfaces/IError'
import IWatchlists from '../interfaces/IWatchlists'
import ICurrencies from '../interfaces/ICurrencies'

import Users from '../schemas/Users'

class WatchlistService {
	async updateWatchlist (body: IWatchlists): Promise<IWatchlists | IError> {
		try {
			const user = await Users.findOne({ _id: body.user })
			if (user) {
				if (body.crypto) {
					user.watchlist.crypto.currencies = []
					user.watchlist.crypto.currencies.push(...body.crypto.currencies)
				}

				if (body.forex) {
					user.watchlist.forex.currencies = []
					user.watchlist.forex.currencies.push(...body.forex.currencies)
				}

				const updated = await Users.findByIdAndUpdate({ _id: user._id }, user, { new: true })
				return updated.watchlist
			} else {
				return { message: 'User not Found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to update your watchlist!', error: error }
		}
	}

	async getWatchlist (id: string, type?: string): Promise<ICurrencies | IWatchlists | IError> {
		try {
			const user = await Users.findById({ _id: id })
			if (user) {
				if (type && type === 'crypto') {
					return user.watchlist.crypto
				} else if (type && type === 'forex') {
					return user.watchlist.forex
				} else {
					return user.watchlist
				}
			} else {
				return { message: 'User not Found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to get your watchlist!', error: error }
		}
	}
}

export default WatchlistService
