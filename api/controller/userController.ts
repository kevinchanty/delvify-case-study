import { UserService } from "../service/userService";
import { Request, Response } from "express";
// import jwtDecode from "jwt-decode";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";


export type User = {
    id: number;
    username: string;
};



dotenv.config();

export class UserController {
    constructor(private userService: UserService) {}

    // getPostQuota = async (req: Request, res: Response) => {
    //     const userId = req.user.id;
    //     try {
    //         const result = await this.photoFeedService.getPostQuota(userId);
    //         res.send(result.toString())
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ error: 'Internal server error' })
    //     }
    // };

}
