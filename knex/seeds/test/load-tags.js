/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");
exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/test-data/test-seedTag.json");
  const data = JSON.parse(contents);
  // Deletes ALL existing entries and reset the id count. Then use
  // batch insert because we have too many articles for simple insert.
  return knex("sqlite_sequence")
    .where("name", "=", "Tag")
    .update({ seq: 0 })
    .then(() => knex("Tag").del())
    .then(() => knex.batchInsert("Tag", data, 100));
};
