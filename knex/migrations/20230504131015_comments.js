/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Comment", (table) => {
    table.increments("id").primary();
    table.integer("authorId");
    table.foreign("authorId").references("User.id").onDelete("SET NULL");
    table.text("contents");
    table.integer("parentId");
    table.integer("postId");
    table.string("posted").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Comment");
};
