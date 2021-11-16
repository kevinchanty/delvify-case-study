import { Knex } from "knex";
import { hashPassword } from "../helpers/password-hash";



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();
    await knex("lists").del();
    await knex("users").del();

    // Inserts seed entries
    const demoId = await knex("users").insert([
        {
            username: "demo_user",
            password_hash: await hashPassword("demo")
        },
    ]).returning("id");

    const firstTaskId = await knex("lists").insert([
        {
            user_id: demoId[0],
            name: "list of demo"
        },
        {
            user_id: demoId[0],
            name: "list of demo2"
        },
        {
            user_id: demoId[0],
            name: "list of demo3"
        },
    ]).returning("id");


    await knex("tasks").insert([
        {
            list_id: firstTaskId[0],
            name: "kevin's birthday",
            description:"cake",
            created_at: new Date(2021,10,5),
            deadline: new Date(2021,10,25)
        },
        {
            list_id: firstTaskId[0],
            name: "apple",
            description:"buy",
            created_at: new Date(2021,10,6),
            deadline: new Date(2021,10,26)
        },
        {
            list_id: firstTaskId[0],
            name: "orange",
            description:"sell",
            created_at: new Date(2021,10,7),
            deadline: new Date(2021,10,27)
        },
    ]);

};
