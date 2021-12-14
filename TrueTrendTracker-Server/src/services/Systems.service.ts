import IError from '../interfaces/IError'
import ISystem from '../interfaces/ISystem'
import ISystems from '../interfaces/ISystems'
import Users from '../schemas/Users'

class SystemsService {
	async updateSystem (body: ISystems): Promise<ISystems | IError> {
		try {
			const user = await Users.findOne({ _id: body.user })
			if (user) {
				if (user.watchlist.crypto.currencies.length) {
					if (body.crypto) {
						user.systems.crypto.system = []
						user.systems.crypto.system.push(...body.crypto.system)
					}

					const updated = await Users.findByIdAndUpdate({ _id: user._id }, user, { new: true })
					return updated.systems
				} else if (user.watchlist.forex.currencies.length) {
					if (body.forex) {
						user.systems.forex.system = []
						user.systems.forex.system.push(...body.crypto.system)
					}

					const updated = await Users.findByIdAndUpdate({ _id: user._id }, user, { new: true })
					return updated.systems
				} else {
					return { message: 'Cannot create systems without a watchlist!', error: '' }
				}
			} else {
				return { message: 'User not Found!', error: '' }
			}
		} catch (error) {
			console.log(error)
			return { message: 'Error while trying to update your system!', error: error }
		}
	}

	async getSystems (id: string, type?: string): Promise<ISystem | ISystems | IError> {
		try {
			const user = await Users.findById({ _id: id })

			if (user) {
				if (type && type === 'crypto') {
					return user.systems.crypto
				} else if (type && type === 'forex') {
					return user.systems.forex
				} else {
					return user.systems
				}
			} else {
				return { message: 'User not Found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to find systems!', error: error }
		}
	}
}

export default SystemsService
