exports.up = function(knex) {
    return knex.schema.createTable('clients',function(table){
      table.string('id_client').notNullable().primary();
      table.string('name').notNullable();
      table.string('cpf').notNullable(); 
      table.string('telephone').notNullable();
      table.string('email').notNullable();            
      table.string('password_hash').notNullable();
      table.string('zip_code').notNullable();
      table.string('address').notNullable();
      table.string('number').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};
