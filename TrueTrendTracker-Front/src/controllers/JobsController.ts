import { Request, Response } from 'express'
import { schedule, getTasks } from 'node-cron'; 'node-cron'
import JobsService from '../services/JobsService'

class JobsController {
	public async list (req: Request, res: Response): Promise<Response> {
		const task = schedule("*/5 * * * * *", function() {
			console.log(task.start())
		})
		return res.json('jobs');
	}

	public async register (req: Request, res: Response): Promise<Response> {
		const jobsService = new JobsService();
		const job = await jobsService.createJob("*/5 * * * * *");
		return res.send('job')
	}
}

export default new JobsController()