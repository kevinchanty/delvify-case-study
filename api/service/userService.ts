import { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) { }

    getDemoId = async () => {
        const demoUserId = await this.knex
            .select("id")
            .from("users")
            .where("username", "demo_user")
            .first()

        return demoUserId["id"];
    };
}