/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
//const fs = require("fs");
import Category from "../../models/Category";

exports.seed = async function (knex) {
  // Categories

  // const contents = fs.readFileSync("./data/seedCategory.json");
  // const data = JSON.parse(contents);

  // // Deletes ALL existing entries
  // // Use batch insert because we have too many articles for simple insert
  await knex("Category").del();
  //   .then(() => knex.batchInsert("Category", data, 100));
  const courses = await Category.query().insertAndFetch({
    name: "courses",
    description: "Courses at Middlebury",
  });
  console.log(courses);
  //   const cs_courses = await courses
  //     .$relatedQuery("children")
  //     .insert({ name: "cs", description: "CS at Middlebury"});
  //   await cs_courses
  //     .$relatedQuery("children")
  //     .insert({name: "cs312", description: "CS312 at Middlebury"});
  //   await courses
  //     .$relatedQuery("children")
  //     .insert({name: "bio", description: "Bio at Middlebury"});
  //   await courses
  //     .$relatedQuery("children")
  //     .insert({name: "theatre", description: "Theatre at Middlebury"});
  //   const anthro_courses = await courses
  //     .$relatedQuery("children")
  //     .insert({name: "anthro", description: "Anthropology at Middlebury"});
  //   await anthro_courses
  //     .$relatedQuery("children")
  //     .insert({name: "anthro 103", description: "Anthropology 103 at Middlebury"});
  //   await anthro_courses
  //     .$relatedQuery("children")
  //     .insert({name: "anthro 306", description: "Anthropology 306 at Middlebury"});
  //   const music_courses = await courses
  //     .$relatedQuery("children")
  //     .insert({name: "music", description: "Music at Middlebury"});
  //   await music_courses
  //     .$relatedQuery("children")
  //     .insert({name: "music 101", description: "Music 101 at Middlebury"});
  //   await music_courses
  //     .$relatedQuery("children")
  //     .insert({name: "music 260", description: "Music 260 at Middlebury"});
  //   await music_courses
  //     .$relatedQuery("children")
  //     .insert({name: "music 500", description: "Music 500 at Middlebury"});
  //   const math_courses = await courses
  //     .$relatedQuery("children")
  //     .insert({name: "math", description: "Math at Middlebury"});
  //     await math_courses
  //     .$relatedQuery("children")
  //     .insert({name: "math 118", description: "Math 118 at Middlebury"});
  //     await math_courses
  //     .$relatedQuery("children")
  //     .insert({name: "math 323", description: "Math 323 at Middlebury"});
  //   await courses
  //     .$relatedQuery("children")
  //     .insert({name: "econ", description: "Econ at Middlebury"});
  //   await courses
  //     .$relatedQuery("children")
  //     .insert({name: "russian", description: "Russian at Middlebury"});
  //   await Category.query().insertAndFetch({name: "confessionals", description: "Confessionals at Middlebury"});
  //   const meals = await Category.query().insertAndFetch({name: "meals", description: "Meals at Middlebury"});
  //   await meals
  //     .$relatedQuery("children")
  //     .insert({name: "ross", description: "ross dining hall"});
  //   await Category.query().insertAndFetch({name: "sports", description: "Sports at Middlebury"});
  //   await Category.query().insertAndFetch({name: "dorms", description: "All dorms at Middlebury"});
  //   await Category.query().insertAndFetch({name: "events", description: "All events at Middlebury"});

  //   const categories = await knex("Category").select("id", "name");
  //   console.log(categories);

  //     // Users and Posts

  //   // Insert the users -> name to id mapping
  //   const users = fs.readFileSync("./data/seedUser.json");
  //   const users_data = JSON.parse(users);
  //   const users_ids = await knex("User")
  //     .del()
  //     .then(() => knex("User").insert(users_data, ["id"]));

  //   const users_name_to_id = new Map();
  //   users_data.forEach((user, i) => {
  //     users_name_to_id.set(user.name, users_ids[i].id);
  //   });

  //   const post_contents = fs.readFileSync("./data/seedPost.json");
  //   const post_data = JSON.parse(post_contents);

  //   // map the posts, replacing author with numeric id
  //   const post_data_with_author = post_data.map((post) => ({
  //     ...post,
  //     author: users_name_to_id.get(post.author),
  //   }));

  //   // Deletes ALL existing entries
  //   // Use batch insert because we have too many articles for simple insert
  //   await knex("Post")
  //     .del()
  //     .then(() => knex.batchInsert("Post", post_data_with_author, 100));

  //     const posts = await knex("Post").select("id", "title");

  //     // Tags

  //     const tag_contents = fs.readFileSync("./data/seedTag.json");
  //   const tag_data = JSON.parse(tag_contents);

  //     const posts_name_to_id = new Map();
  //   posts.forEach((post) => {
  //     posts_name_to_id.set(post.title, post.id);
  //   });
  //   //console.log(posts_name_to_id);

  //   const categories_name_to_id = new Map();
  //   categories.forEach((cat) => {
  //     categories_name_to_id.set(cat.name, cat.id);
  //   });
  //   console.log(categories);
  //   console.log(categories_name_to_id);

  //   const tag_data_with_ids = tag_data.map((tag) => ({
  //     post: posts_name_to_id.get(tag.post),
  //     category: categories_name_to_id.get(tag.category)
  //   }));
  //   console.log(tag_data_with_ids);

  //     await knex("Tag")
  //     .del()
  //     .then(() => knex.batchInsert("Tag", tag_data_with_ids, 100));
};
