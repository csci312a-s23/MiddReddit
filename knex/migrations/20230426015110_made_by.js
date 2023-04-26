/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.table("Post", (table) => {
      table.integer("author");
      table.foreign("author").references("User.id").onDelete("SET NULL");
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function (knex) {
    return knex.schema.table("Post", (table) => {
      table.dropColumn("author");
    });
  };
