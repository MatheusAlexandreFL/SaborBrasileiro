/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('restaurantes', (table) => {
    table.increments('id').primary();
    table.integer('usuario_id')
      .unsigned()
      .notNullable();
    table.string('nome').notNullable();
    table.text('descricao').nullable();
    table.string('categoria').notNullable();
    table.string('rua').notNullable();
    table.string('numero').notNullable();
    table.string('bairro').notNullable();
    table.string('cep', 9).nullable();
    table.string('cidade').notNullable();
    table.string('estado', 2).notNullable();
    table.string('telefone', 20).nullable();
    table.text('imagem_url').nullable();
    table.text('galeria').nullable();
    table.decimal('nota', 2, 1).notNullable().defaultTo(0);
    table.timestamps(true, true);

    table
      .foreign('usuario_id')
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('restaurantes');
};
