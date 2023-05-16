/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("Post", (table) => {
    //table.increments("author");
    table
      .integer("author")
      .references("id")
      .inTable("User")
      .onDelete("SET NULL");
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
