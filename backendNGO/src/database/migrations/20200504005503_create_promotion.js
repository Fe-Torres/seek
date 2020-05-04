exports.up = function(knex) {
    return knex.schema.createTable('promotion',function(table){
      table.string('id_promo').notNullable().primary();
      table.string('id_public').notNullable();
      table.string('id_store').notNullable();
      table.string('name').notNullable(); 
      table.string('price').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTable('promotion');
};
