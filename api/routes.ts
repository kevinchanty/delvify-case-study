import express from "express";
import { listController, taskController, userController } from "./app";

export const routes = express.Router();

// lists
routes.get("/lists",listController.getList);

// tasks
routes.get("/tasks/:listId",taskController.getTasks);

