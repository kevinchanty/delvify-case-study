import { Request, Response } from "express";
import { TaskService } from "../service/taskService";

export class TaskController {
    private taskService:TaskService

    constructor(taskService: TaskService) {
         this.taskService = taskService;
        //  Set Up Timer
        this.setUpTimer()
    }

    setUpTimer = async()=>{
        const result = await this.taskService.getAllTasks();
        result.forEach(list =>{
            setTimeout(()=>{
                console.log(`Mock Email Sent: Tasks ${result[0].id} is due.`);
            },list.deadline.getTime() - Date.now())
        })
        
    }

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

    postTasks = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const body = req.body
        
        try {
            const result = await this.taskService.postTasks(body.listId,body.name,body.description,body.deadline);
            if (result[0].deadline.getTime() > Date.now()) {
                setTimeout(()=>{
                    console.log(`Mock Email Sent: Tasks ${result[0].id} is due.`);
                    
                },result[0].deadline.getTime() - Date.now())
                
            }
            res.status(201).json({success: result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    putTasks = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const body = req.body
        
        try {
            const result = await this.taskService.putTasks(body.id,body.name,body.description,body.deadline);
            res.json({success: result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    putTasksStatus = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const body = req.body
        try {
            const result = await this.taskService.putTasksStatus(body.id,body.isCompleted);
            if (body.isCompleted) {
                console.log(`Mock Email Sent: Tasks ${result.join(", ")} are completed.`)
            }
            res.json({success: result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    deleteTasks = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const id = await req.body.id
    
        try {
            const result = await this.taskService.deleteTasks(id);
            res.json({success: result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    putTaskList = async (req: Request, res: Response) => {
        const {id, listId} = req.body
        
        try {
            const result = await this.taskService.putTaskList(id,listId);
            res.json({success: result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };
}
