import { ObjectId } from 'mongoose'
import IWatchlists from './IWatchlists'

interface IUser {
	_id: ObjectId,
	name: string,
	username: string,
	email: number,
	password: string,
	role: string,
	salt: string,
	watchlist: IWatchlists
}

export default IUser
