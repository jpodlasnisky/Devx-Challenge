import Knex = require("knex")

export async function up(knex: any) {
  return knex.schema.createTable('products', (table: any) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.decimal('price').notNullable();
    table.jsonb('product_images');
    table.integer('created_by').notNullable().references('id').inTable('users')
    table.timestamp('published_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: any) {
  return knex.schema.dropTable('products');
}
