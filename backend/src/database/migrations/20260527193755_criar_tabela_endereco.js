/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('enderecos', (table) => {
    table.increments('id').primary();
    table.integer('restaurante_id')
         .unsigned()
         .references('id')
         .inTable('restaurantes')
         .onDelete('CASCADE')
         .notNullable();
    table.string('rua').notNullable();
    table.integer('numero').notNullable();
    table.string('bairro').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('enderecos')
};
