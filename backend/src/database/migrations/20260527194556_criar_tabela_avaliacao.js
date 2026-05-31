/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('avaliacoes', (table) => {
    table.increments('id').primary();
    table.integer('id_restaurante')
         .unsigned()
         .references('id')
         .inTable('restaurantes')
         .onDelete('CASCADE')
         .notNullable();
    table.integer('id_usuario')
         .unsigned()
         .references('id')
         .inTable('usuarios')
         .onDelete('CASCADE')
         .notNullable();
    table.integer('id_prato')
         .unsigned()
         .references('id')
         .inTable('pratos')
         .onDelete('SET NULL')
         .nullable();
    table.decimal('nota', 2, 1).notNullable();
    table.string('comentario').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('avaliacoes');
};

