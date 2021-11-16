import { Knex } from "knex";

export class ListService {
    constructor(private knex: Knex) { }


    getLists = async (userId: number) => {

        const result = await this.knex
            .select("*")
            .from("lists")
            .where("user_id", userId)
            .andWhere("is_deleted",false);

        // const result = 3 - todayRows.length;

        return (result);
    };

    postLists = async (userId: number, name: string) => {
        const result = await this.knex("lists")
            .insert({
                user_id: userId,
                name,
            }).returning("id")
        
        return result;
    };

    deleteLists = async (listId: number) => {
        const result = await this.knex("lists")
            .update({
                is_deleted:true,
            })
            .where("id",listId)
            .returning("id")
        
        return result;
    };
}