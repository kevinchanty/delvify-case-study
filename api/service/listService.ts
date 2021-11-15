import { Knex } from "knex";

export class ListService {
    constructor(private knex: Knex) { }


    getLists = async (userId: number) => {

        const demoUserId = await this.knex
            .select("id")
            .from("users")
            .where("username","kevin")
            .first()

        const result = await this.knex
            .select("*")
            .from("lists")
            .where("user_id", demoUserId["id"]);

        // const result = 3 - todayRows.length;

        return (result);
    };

    postList = async (listId: number, name: string, description: string, deadline: Date) => {
        const result = await this.knex("tasks")
            .insert({
                list_id:listId,
                name,
                description,
                deadline
            }).returning("id")
        

        return result;
    };
}