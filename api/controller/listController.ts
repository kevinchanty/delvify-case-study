import { Request, Response } from "express";
import { ListService } from "../service/listService";
export class ListController {
    constructor(private listService: ListService) {}

    getLists = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const userId = 6;
        try {
            const result = await this.listService.getLists(userId);
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    // postList = async (req: Request, res: Response) => {
    //     // const userId = req.user.id;
    //     const body = req.body
        
    //     try {
    //         const result = await this.listService.postTasks(body.listId,body.name,body.description,body.deadline);
    //         res.status(201).json({success: result})
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ error: 'Internal server error' })
    //     }
    // };

}
