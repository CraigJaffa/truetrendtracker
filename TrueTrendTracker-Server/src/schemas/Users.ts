import { Schema, model } from 'mongoose'
import crypto from 'crypto'

import IUser from '../interfaces/IUsers'

const UserSchema = new Schema<IUser>({
	name: String,
	password: String,
	email: {
		type: String,
		unique: true
	},
	username: String,
	role: String,
	salt: String,
	watchlist: {},
	systems: {}
}, {
	timestamps: true
})

UserSchema.pre('save', function () {
	this.salt = crypto.randomBytes(16).toString('hex')
	this.password = crypto.pbkdf2Sync(this.password, this.salt,
		1000, 64, 'sha512').toString('hex')
})

export default model<IUser>('User', UserSchema)
