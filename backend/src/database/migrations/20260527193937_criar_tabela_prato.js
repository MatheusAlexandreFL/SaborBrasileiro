/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pratos', (table) => {
    table.increments('id').primary();
    table.integer('restaurante_id')
         .unsigned()
         .references('id')
         .inTable('restaurantes')
         .onDelete('CASCADE')
         .notNullable();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.string('foto_prato').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pratos')
};
