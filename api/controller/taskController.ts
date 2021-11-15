import { Request, Response } from "express";
import { TaskService } from "../service/taskService";

export class TaskController {
    constructor(private taskService: TaskService) {}

    getTasks = async (req: Request, res: Response) => {
        const listId = parseInt(req.params.listId);
        if (isNaN(listId)) {
            res.status(400).json({error: 'Invalis List Id.'});
            return
        }

        try {
            const result = await this.taskService.getTasks(listId);
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    };

}
