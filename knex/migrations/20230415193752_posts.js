/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Post", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.text("contents");
    //table.string("author");
    //table.specificType("comments", "INT[]");
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
