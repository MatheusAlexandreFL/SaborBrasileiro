export function up(knex) {
  return knex.schema.alterTable('restaurantes', (table) => {
    table.text('galeria').nullable();
  });
}

export function down(knex) {
  return knex.schema.alterTable('restaurantes', (table) => {
    table.dropColumn('galeria');
  });
}
