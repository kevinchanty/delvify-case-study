import { Knex } from "knex";
import { hashPassword } from "../helpers/password-hash";



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();
    await knex("lists").del();
    await knex("users").del();

    // Inserts seed entries
    const kevinId = await knex("users").insert([
        {
            username: "kevin",
            password_hash: await hashPassword("0901")
        },
    ]).returning("id");

    const firstTaskId = await knex("lists").insert([
        {
            user_id: kevinId[0],
            name: "kevin's list of demo"
        },
        {
            user_id: kevinId[0],
            name: "kevin's list of demo2"
        },
        {
            user_id: kevinId[0],
            name: "kevin's list of demo3"
        },
    ]).returning("id");


    await knex("tasks").insert([
        {
            list_id: firstTaskId[0],
            name: "kevin is doing great",
            description:"he just need to do anything",
            created_at: new Date(2021,10,5),
            deadline: new Date(2021,10,25)
        },
        {
            list_id: firstTaskId[0],
            name: "kevin is doing great2",
            description:"he just need to do anything2",
            created_at: new Date(2021,10,6),
            deadline: new Date(2021,10,26)
        },
        {
            list_id: firstTaskId[0],
            name: "kevin is doing great3",
            description:"he just need to do anything3",
            created_at: new Date(2021,10,7),
            deadline: new Date(2021,10,27)
        },
    ]);

};
