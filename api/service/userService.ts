import { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) { }

    getDemoId = async () => {
        const demoUserId = await this.knex
            .select("id")
            .from("users")
            .where("username", "kevin")
            .first()

        return demoUserId["id"];
    };
}