exports.up = function (knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.string('foto_perfil').nullable();
    table.string('tipoUsuario').notNullable().defaultTo('cliente');
    table.string('cnpj', 14).nullable().unique();
    table.timestamps(true, true);
  });

};

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios');
};