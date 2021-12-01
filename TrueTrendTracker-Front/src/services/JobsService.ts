import { schedule } from 'node-cron'

class JobsService {
	async createJob (name: string): Promise<any> {
		try {
			const job = schedule(name, () => {})
			return job
		} catch (error) {
			return error
		}
	}
}

export default JobsService
