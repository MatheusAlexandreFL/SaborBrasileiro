/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('avaliacoes', (table) => {
    table.increments('id').primary();
    table.integer('restaurante_id')
         .unsigned()
         .references('id')
         .inTable('restaurantes')
         .onDelete('CASCADE')
         .notNullable();
    table.integer('usuario_id')
         .unsigned()
         .references('id')
         .inTable('usuarios')
         .onDelete('CASCADE')
         .notNullable();
    table.integer('prato_id')
         .unsigned()
         .references('id')
         .inTable('pratos')
         .onDelete('CASCADE')
         .notNullable();
    table.decimal('nota_avaliacao', 2, 1).notNullable(); // 1.0 até 5.0 estrelas
    table.string('comentario').notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('avaliacoes');
};
