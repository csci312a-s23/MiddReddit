/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
//const fs = require("fs");
const Category = require("../../models/Category");

exports.seed = async function (knex) {
  // const contents = fs.readFileSync("./data/seedCategory.json");
  // const data = JSON.parse(contents);

  // // Deletes ALL existing entries
  // // Use batch insert because we have too many articles for simple insert
  // return knex("Category")
  //   .del()
  //   .then(() => knex.batchInsert("Category", data, 100));
  const courses = await Category.query().insertAndFetch({
    name: "courses",
    description: "Courses at Middlebury",
  });
  await courses
    .$relatedQuery("children")
    .insert({ name: "cs", description: "CS at Middlebury" });
  //await knex("Category").insert({ name: "courses", description: "Courses at Middlebury" })
};
