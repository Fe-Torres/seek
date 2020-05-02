exports.up = function(knex) {
    return knex.schema.createTable('lists',function(table){
      table.string('id_list').notNullable();
      table.string('id_user').notNullable();
      table.string('id_store').notNullable();
      table.string('sent_items').notNullable();
      table.string('returned_items');
      table.string('verify').notNullable();
      table.string('status').notNullable();
      table.datetime('date_time').notNullable();
      table.string('password').notNullable();
        
      table.foreign('id_user').references('id_user').inTable('users');
      table.foreign('id_store').references('id_store').inTable('store');

    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('lists');
};