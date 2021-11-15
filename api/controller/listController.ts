import { Request, Response } from "express";
import { ListService } from "../service/listService";
export class ListController {
    constructor(private listService: ListService) {}

    getList = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const userId = 4;
        try {
            const result = await this.listService.getList(userId);
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

}
