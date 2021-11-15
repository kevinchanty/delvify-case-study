import { Request, Response } from "express";
// import jwtDecode from "jwt-decode";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { ListService } from "../service/listService";

dotenv.config();

export class ListController {
    constructor(private listService: ListService) {}

    getList = async (req: Request, res: Response) => {
        // const userId = req.user.id;
        const userId = 1;
        try {
            const result = await this.listService.getList(userId);
            res.send(result.toString())
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

}
