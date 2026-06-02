export function up(knex) {
  return knex.schema.alterTable('restaurantes', table => {
    table.dropForeign('usuario_id');
    table.dropUnique(['usuario_id']);
    table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE');
  });
};

export function down(knex) {
  return knex.schema.alterTable('restaurantes', table => {
    table.dropForeign('usuario_id');
    table.unique(['usuario_id']);
    table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE');
  });
};
