import crypto from 'crypto'

import IUsers from '../interfaces/IUsers'
import IError from '../interfaces/IError'

import Users from '../schemas/Users'

class UsersService {
	async findUsers (): Promise<IUsers[] | IError> {
		try {
			const users = await Users.find()
			return users
		} catch (error) {
			return { message: 'Error while trying to find users!', error: error }
		}
	}

	async getUser (_id: string) : Promise<IUsers | IError> {
		try {
			const user = await Users.findById(_id)
			if (user) {
				return user
			} else {
				return { message: 'User not found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to find user!', error: error }
		}
	}

	async updateUser (body: IUsers) : Promise<IUsers | IError> {
		try {
			if (body.password) {
				const update = await Users.findById(body._id)
				body.password = crypto.pbkdf2Sync(update.password, update.salt,
					1000, 64, 'sha512').toString('hex')
			}

			const user = await Users.findOneAndUpdate({ _id: body._id }, body, { new: true })
			if (user) {
				return user
			} else {
				return { message: 'User not found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to update user!', error: error }
		}
	}
}

export default UsersService
