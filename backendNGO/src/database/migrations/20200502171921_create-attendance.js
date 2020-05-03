exports.up = function(knex) {
    return knex.schema.createTable('attendance',function(table){
      table.string('id_list').notNullable().primary();
      table.string('client_id').notNullable();
      table.string('store_id').notNullable();
      table.json('sent_items');
      table.json('returned_items');
      table.string('verified').notNullable();
      table.string('status').notNullable();
      table.datetime('date_time').notNullable();
  
      table.foreign('client_id').references('id_client').inTable('client');
      table.foreign('store_id').references('id_store').inTable('store');

    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('attendance');
};