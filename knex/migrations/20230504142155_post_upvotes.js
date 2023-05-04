/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("PostUpvote", (table) => {
    table.increments("id").primary();
    table.integer("ownerId");
    table.integer("postId"); //how to know if belongs to a comment or a post?
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("PostUpvote");
};
