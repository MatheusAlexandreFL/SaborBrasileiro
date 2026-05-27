/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('restaurantes', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable()
    table.integer('usuario_id')
         .unique()
         .unsigned()
         .references('id')
         .inTable('usuarios')
         .onDelete('CASCADE')
         .notNullable();
    table.string('especialidade').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('restaurantes')
};
