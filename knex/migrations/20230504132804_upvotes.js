/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("CommentUpvote", (table) => {
    table.increments("id").primary();
    table.integer("ownerId");
    table.integer("commentId"); //how to know if belongs to a comment or a post?
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("CommentUpvote");
};
