import { ObjectId } from 'mongoose'
interface IWatchlists {
	type?: string,
	user?: ObjectId,
	crypto?: {
		currencies?: Array<string>
	},
	forex?: {
		currencies?: Array<string>
	}
}

export default IWatchlists
