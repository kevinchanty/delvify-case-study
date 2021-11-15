import express from "express";
import { listController, userController } from "./app";

export const routes = express.Router();

// lists
routes.get("/lists",listController.getList);

