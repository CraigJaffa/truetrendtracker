import { ObjectId } from 'mongoose'
import ISystems from './ISystems'
import IWatchlists from './IWatchlists'

interface IUser {
	_id: ObjectId,
	name: string,
	username: string,
	email: number,
	password: string,
	role: string,
	salt: string,
	watchlist: IWatchlists,
	systems: ISystems
}

export default IUser
