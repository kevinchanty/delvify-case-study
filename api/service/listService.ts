import { Knex } from "knex";

export class ListService {
    constructor(private knex: Knex) { }

    getList = async (userId: number) => {
        // const rows = await this.knex
        //     .select("*")
        //     .from("student_posts")
        //     .where("user_id", userId);

        // const todayRows = rows.filter((row) => {
        //     const date = new Date(row.create_at).getDate();
        //     return date === new Date().getDate();
        // });

        // const result = 3 - todayRows.length;

        return (`${userId} is right`);
    };
}