import { Knex } from "knex";

export class TaskService {
    constructor(private knex: Knex) { }

    getTasks = async (listId: number) => {
        const result = await this.knex
            .select("*")
            .from("tasks")
            .where("list_id", listId)
            .andWhere("is_deleted",false)
            .orderBy("created_at")
        return result;
    };

    postTasks = async (listId: number, name: string, description: string, deadline: Date) => {
        const result = await this.knex("tasks")
            .insert({
                list_id:listId,
                name,
                description,
                deadline
            }).returning("id")
        

        return result;
    };

    putTasks = async (id: number, name: string, description: string, deadline: Date) => {
        const result = await this.knex("tasks")
            .update({
                name,
                description,
                deadline,
                updated_at: new Date()
            })
            .where("id",id)
            .returning("id")

        return result;
    };

    putTasksStatus = async (id: number, isCompleted: boolean) => {
        const result = await this.knex("tasks")
            .update({
                is_completed: isCompleted,
                updated_at: new Date()
            })
            .where("id",id)
            .returning("id")

        return result;
    };

    deleteTasks = async (id: number[]) => {
        console.log(id);
        
        const result = await this.knex("tasks")
            .update({
                is_deleted: true,
                updated_at: new Date()
            })
            .whereIn("id",id)
            .returning("id")

        return result;
    };

    putTaskList = async (id: number[], listId: number) => {
        const result = await this.knex("tasks")
            .update({
                list_id: listId,
                updated_at: new Date()
            })
            .whereIn("id",id)
            .returning("id")

        return result;
    };
}