import express from "express";
import { listController, taskController, userController } from "./app";

export const routes = express.Router();

// lists
routes.get("/lists",listController.getList);

// tasks
routes.get("/tasks/:listId",taskController.getTasks);
routes.post("/tasks",taskController.postTasks);
routes.put("/tasks",taskController.putTasks);
routes.put("/tasksStatus",taskController.putTasksStatus);
routes.delete("/tasks/:id",taskController.deleteTasks);

