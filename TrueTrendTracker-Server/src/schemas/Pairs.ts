import { Schema, model } from 'mongoose'

import IPairs from '../interfaces/IPairs'

const PairSchema = new Schema<IPairs>({
	user: String,
	pairs: Array
}, {
	timestamps: true
})
export default model<IPairs>('Pair', PairSchema)
