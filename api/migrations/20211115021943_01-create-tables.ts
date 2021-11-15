import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.text("username").notNullable();
        table.text("password_hash").notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable("lists", (table) => {
        table.increments();
        table.integer("user_id").references("users.id").unsigned().notNullable();
        table.text("name").notNullable();
        table.boolean("is_deleted").defaultTo(false).notNullable();
        table.timestamps(true,true);
    });

    await knex.schema.createTable("tasks", table => {
        table.increments();
        table.integer("list_id").references("lists.id").unsigned().notNullable();
        table.text("name").notNullable();
        table.text("description").notNullable();
        table.timestamp("deadline").notNullable();
        table.boolean("is_completed").defaultTo(false).notNullable();
        table.boolean("is_deleted").defaultTo(false).notNullable();
        table.timestamps(true,true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tasks");
    await knex.schema.dropTable("lists");
    await knex.schema.dropTable("users");
}

