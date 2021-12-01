import crypto from 'crypto'

import IUsers from '../interfaces/IUsers'
import IError from '../interfaces/IError'

import Users from '../schemas/Users'

class AuthService {
	async login (body: IUsers): Promise<IUsers | IError> {
		try {
			const user = await Users.findOne({ username: body.username })

			if (user) {
				// Verify password
				const password = crypto.pbkdf2Sync(body.password,
					user.salt, 1000, 64, 'sha512').toString('hex')

				if (user.password === password) {
					return user
				} else {
					return { message: 'Access Denied!', error: '' }
				}
			} else {
				return { message: 'User not found!', error: '' }
			}
		} catch (error) {
			return { message: 'Error while trying to find users!', error: error }
		}
	}

	async register (body: IUsers): Promise<IUsers | IError> {
		try {
			const user = await Users.create(body)
			return user
		} catch (error) {
			return { message: 'User already exist!', error: '' }
		}
	}
}

export default AuthService
