import Knex = require("knex")

export async function up(knex: any) {
  return knex.schema.createTable('users', (table: any) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('is_admin').notNullable();
    table.boolean('is_active').notNullable();
    table.boolean('pending').notNullable();
    table.string('confirmation_token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: any) {
  return knex.schema.dropTable('users');
}
