exports.up = function(knex) {
    return knex.schema.createTable('store',function(table){
      table.string('id_store').notNullable();
      table.string('id_public').notNullable();
      table.string('name').notNullable();
      table.string('telephone').notNullable();
      table.string('cpf_cnpj').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('delivery').notNullable();
      table.string('zip_code').notNullable();
      table.string('address').notNullable();
      table.string('house_number').notNullable();
      table.string('status').notNullable();
      table.string('type').notNullable();
      table.string('category').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('store');
};