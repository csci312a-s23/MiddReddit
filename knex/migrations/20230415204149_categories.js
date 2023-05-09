/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Category", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
    table.integer("parent_");
    table.specificType("relatedPosts", "INT[]");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Category");
};
