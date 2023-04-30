/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");
exports.seed = function (knex) {
  const contents = fs.readFileSync(
    "../../../data/test-data/test-seedCategory.json"
  );
  const data = JSON.parse(contents);
  // Deletes ALL existing entries and reset the id count. Then use
  // batch insert because we have too many articles for simple insert.
  return knex("sqlite_sequence")
    .where("name", "=", "Category")
    .update({ seq: 0 })
    .then(() => knex("Category").del())
    .then(() => knex.batchInsert("Category", data, 100));
};
