import { Knex } from "knex";

export class ListService {
    constructor(private knex: Knex) { }

    getList = async (userId: number) => {
        const result = await this.knex
            .select("*")
            .from("lists")
            .where("user_id", userId);

        // const result = 3 - todayRows.length;

        return (result);
    };
}