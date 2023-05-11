/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Tag", (table) => {
    //table.increments("id").primary();
    table.integer("post").references("id").inTable("Post");
    table.integer("category").references("id").inTable("Category");
    table.primary(["post", "category"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Tag");
};
