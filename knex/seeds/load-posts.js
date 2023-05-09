/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");
exports.seed = async function (knex) {
  // Insert the users -> name to id mapping
  const users = fs.readFileSync("./data/seedUser.json");
  const users_data = JSON.parse(users);
  const users_ids = await knex("User")
    .del()
    .then(() => knex("User").insert(users_data, ["id"]));

  const users_name_to_id = new Map();
  users_data.forEach((user, i) => {
    users_name_to_id.set(user.name, users_ids[i].id);
  });

  const contents = fs.readFileSync("./data/seedPost.json");
  const data = JSON.parse(contents);

  // map the posts, replacing author with numeric id
  const data_with_author = data.map((post) => ({
    ...post,
    author: users_name_to_id.get(post.author),
  }));

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("Post")
    .del()
    .then(() => knex.batchInsert("Post", data_with_author, 100));
};
