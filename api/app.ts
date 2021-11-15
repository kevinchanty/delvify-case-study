import express from "express";
import http from "http";
import Knex from "knex";
import dotenv from "dotenv";
import ip from "ip";
import { UserService } from "./service/userService";
import { UserController } from './controller/userController';
import { ListController } from './controller/listController';
import { ListService } from './service/listService';

dotenv.config();

// Express
const PORT = 3100;
const app = express();
const server = new http.Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Knex
const knexConfigs = require("./knexfile");
const environment = process.env.NODE_ENV;
if (!environment) {
    throw new Error("No NODE_ENV in .env!");
}
const knexConfig = knexConfigs[environment];
const knex = Knex(knexConfig);

// Dependency
export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const listService = new ListService(knex);
export const listController = new ListController(listService);

import { routes } from "./routes";
app.use("/", routes);

app.use((req, res) => {
    res.status(404).json({
        error: `Route not match, method: ${req.method}, url: ${req.url}`,
    });
});

const message = `============================================
Listening at: http://localhost:${PORT}
On Network: http://${ip.address()}:${PORT}
============================================`;

server.listen(PORT, () => {
    console.clear();
    console.log(message);
});
