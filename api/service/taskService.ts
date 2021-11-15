import { Knex } from "knex";

export class TaskService {
    constructor(private knex: Knex) { }

    getTasks = async (listId: number) => {
        const result = await this.knex
            .select("*")
            .from("tasks")
            .where("list_id", listId)
            .orderBy("created_at")

        return result;
    };
}