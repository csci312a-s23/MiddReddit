/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");
import Category from "../../../models/Category";
exports.seed = async function (knex) {
  /*onst contents = fs.readFileSync("./data/test-data/test-seedCategory.json");
  const data = JSON.parse(contents);
  // Deletes ALL existing entries and reset the id count. Then use
  // batch insert because we have too many articles for simple insert.
  return knex("sqlite_sequence")
    .where("name", "=", "Category")
    .update({ seq: 0 })
    .then(() => knex("Category").del())
    .then(() => knex.batchInsert("Category", data, 100));
};
*/

  await knex("Category").del();
  //   .then(() => knex.batchInsert("Category", data, 100));
  const courses = await Category.query().insertAndFetch({
    name: "courses",
    description: "Courses at Middlebury",
  });
  const cs_courses = await courses
    .$relatedQuery("children")
    .insert({ name: "cs", description: "CS at Middlebury" });
  await cs_courses
    .$relatedQuery("children")
    .insert({ name: "cs312", description: "CS312 at Middlebury" });
  await courses
    .$relatedQuery("children")
    .insert({ name: "bio", description: "Bio at Middlebury" });
  await courses
    .$relatedQuery("children")
    .insert({ name: "theatre", description: "Theatre at Middlebury" });

  await Category.query().insertAndFetch({
    name: "confessionals",
    description: "Confessionals at Middlebury",
  });
  const meals = await Category.query().insertAndFetch({
    name: "meals",
    description: "Meals at Middlebury",
  });
  await meals
    .$relatedQuery("children")
    .insert({ name: "ross", description: "ross dining hall" });
  await Category.query().insertAndFetch({
    name: "sports",
    description: "Sports at Middlebury",
  });
  await Category.query().insertAndFetch({
    name: "dorms",
    description: "All dorms at Middlebury",
  });
  await Category.query().insertAndFetch({
    name: "events",
    description: "All events at Middlebury",
  });

  const categories = await knex("Category").select("id", "name");

  const post_contents = fs.readFileSync("./data/test-data/test-seedPost.json");
  const post_data = JSON.parse(post_contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  await knex("Post")
    .del()
    .then(() => knex.batchInsert("Post", post_data, 100));

  const posts = await knex("Post").select("id", "title");

  // Tags

  const tag_contents = fs.readFileSync("./data/test-data/test-seedTag.json");
  const tag_data = JSON.parse(tag_contents);

  const posts_name_to_id = new Map();
  posts.forEach((post) => {
    posts_name_to_id.set(post.title, post.id);
  });

  const categories_name_to_id = new Map();
  categories.forEach((cat) => {
    categories_name_to_id.set(cat.name, cat.id);
  });

  const tag_data_with_ids = tag_data.map((tag) => ({
    post: posts_name_to_id.get(tag.post),
    category: categories_name_to_id.get(tag.category),
  }));

  await knex("Tag")
    .del()
    .then(() => knex.batchInsert("Tag", tag_data_with_ids, 100));
};
