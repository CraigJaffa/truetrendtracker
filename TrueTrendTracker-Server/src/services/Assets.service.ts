import axios, { AxiosResponse } from 'axios'
import https from 'https'

import IAssets from '../interfaces/IAssets'
import IError from '../interfaces/IError'

import Assets from '../schemas/Assets'

class AssetsService {
	async listAssets (): Promise<IAssets[] | IError> {
		try {
			const assets = await Assets.find().skip(0).limit(20).lean()
			return assets
		} catch (error) {
			return { message: 'Error while trying to find assets!', error: error }
		}
	}

	async getAsset (symbol: string): Promise<IAssets | IError> {
		try {
			const assets = await Assets.findOne({ symbol: symbol }).lean()
			return assets
		} catch (error) {
			return { message: `Error while trying to find ${symbol} asset!`, error: error }
		}
	}

	async importAssets (amount: number, index: number): Promise<AxiosResponse> {
		try {
			const instance = axios.create({
				httpsAgent: new https.Agent({
					rejectUnauthorized: false
				})
			})

			console.log(index === 1 ? index : ((amount * index) - amount) + 1)

			const req = await instance({
				url: `/listings/latest?limit=${amount}&start=${index === 1 ? index : amount * index}`,
				baseURL: `${process.env.CMC_BASEURL}/${process.env.CMC_VERSION}/${process.env.CMC_PATH_CRYPTOCURRENCY}`,
				method: 'get',
				headers: {
					'X-CMC_PRO_API_KEY': `${process.env.CMC_APIKEY}`
				}
			})

			return req
		} catch (error) {
			return error
		}
	}
}

export default AssetsService
