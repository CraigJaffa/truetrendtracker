import { ObjectId } from 'mongoose'
interface ISystems {
	type?: string,
	user?: ObjectId,
	crypto?: {
		system?: Array<string>
	},
	forex?: {
		system?: Array<string>
	}
}

export default ISystems
