import { Schema, model } from 'mongoose'

import IAsset from '../interfaces/IAssets'

const AssetSchema = new Schema<IAsset>({
	name: String,
	symbol: {
		type: String,
		unique: true
	},
	slug: String
}, {
	timestamps: true
})
export default model<IAsset>('Asset', AssetSchema)
