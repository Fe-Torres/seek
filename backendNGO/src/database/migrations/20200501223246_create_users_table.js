exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
      table.string('id_user').notNullable();
      table.string('name').notNullable();
      table.string('telephone').notNullable();
      table.string('email').notNullable();
      table.string('zip_code').notNullable();
      table.string('sex').notNullable(); 
      table.string('password').notNullable();
      table.string('address').notNullable();
      table.string('house_number').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
