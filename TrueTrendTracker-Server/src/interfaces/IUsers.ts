import { ObjectId } from 'mongoose'

interface IUser {
	_id: ObjectId,
	name: string,
	username: string,
	email: number,
	password: string,
	role: string,
	salt: string
}

export default IUser
