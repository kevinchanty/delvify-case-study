import express from "express";
import http from "http";
import Knex from "knex";
import dotenv from "dotenv";
import ip from "ip";

dotenv.config();
// console.log(process.env);

const PORT = 3100;

// Express
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
// export const manageQuizService = new ManageQuizService(knex);


// import { routes } from "./routes";
// app.use("/", routes);
app.use(express.static("./public"));

app.use((req, res, next) => {
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
