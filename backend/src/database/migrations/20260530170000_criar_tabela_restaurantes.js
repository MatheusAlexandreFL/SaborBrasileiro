exports.up = function(knex) {
  return knex.schema.createTable('restaurantes', (table) => {
    table.increments('id').primary();
    table.integer('usuario_id').unsigned().notNullable();
    table.string('nome').notNullable();
    table.text('descricao').nullable();
    table.string('categoria').notNullable();
    table.string('endereco').notNullable();
    table.string('cidade').notNullable();
    table.string('estado', 2).notNullable();
    table.string('telefone', 20).nullable();
    table.string('imagem_url').nullable();
    table.decimal('nota', 3, 2).notNullable().defaultTo(0);
    table.timestamps(true, true);

    table
      .foreign('usuario_id')
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('restaurantes');
};
