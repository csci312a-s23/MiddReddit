/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Post", (table) => {
    table.increments("id").primary();
    table.string("title").unique().notNullable();
    table.string("author");
    table.text("contents");
    table.specificType("comments", "INT[]");
    table.string("posted").notNullable();
    //table.specificType("tag", "INT[]"); //tags to a specific category
    table.integer("upvotes").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Post");
};
