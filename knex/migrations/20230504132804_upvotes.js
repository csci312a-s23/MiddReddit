/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("CommentUpvote", (table) => {
    table.increments("id").primary();
    table.integer("ownerId");
    table.integer("commentId");
    table.boolean("upvote"); //true is upvote, down is downvote
    table.string("posted").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("CommentUpvote");
};
