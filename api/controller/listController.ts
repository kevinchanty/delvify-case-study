import { UserService } from './../service/userService';
import { Request, Response } from "express";
import { ListService } from "../service/listService";
export class ListController {
    constructor(private listService: ListService, private userService: UserService) { }

    getLists = async (req: Request, res: Response) => {
        const userId = await this.userService.getDemoId()
        try {
            const result = await this.listService.getLists(userId);
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    postLists = async (req: Request, res: Response) => {
        const userId = await this.userService.getDemoId()
        const { name } = req.body

        try {
            const result = await this.listService.postLists(userId, name);
            res.status(201).json({ success: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    deleteLists = async (req: Request, res: Response) => {
        const listId = req.body.listId
        console.log(listId);
        
        try {
            const result = await this.listService.deleteLists(listId);
            res.status(200).json({ success: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

}
