import { render } from "@testing-library/react";
import { testApiHandler } from "next-test-api-route-handler";
import { knex } from "../../knex/knex.js";
//pages
import MainApp from "../pages/_app.js";
import MainPage from "../pages/index.js";
//endpoints
import categories_endpoint from "../pages/api/categories.js";
import posts_endpoint from "../pages/api/posts/index.js";
//import specific_post_endpoint from "../pages/api/posts/[id]/index.js";
//data
import category_data from "../../data/test-data/test-seedCategory.json";
import post_data from "../../data/test-data/test-seedPost.json";
//import tag_data from "../../data/test-data/test-seedTag.json";

//models
// import Post from "../../models/Post.js";
// import Category from "../../models/Category.js";
/*
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
*/
// Replace the router with the mock

describe("MiddReddit API", () => {
  beforeAll(() => {
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });
  beforeEach(() => {
    return knex.seed.run();
  });
  jest.mock("next/router", () => require("next-router-mock"));

  describe("End-to-end testing", () => {
    test("Render index.js component", () => {
      render(<MainApp Component={MainPage} />);
    });
  });

  describe("Endpoint testing", () => {
    /*tests to complete:
        POST a post
        POST a comment
        GET a single post
        PUT a single post
        PUT like/dislike
        *Remember to uncomment the imports
    */
    test("GET /api/categories should return all categories", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: categories_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          await expect(res.json()).resolves.toStrictEqual([
            "bio",
            "confessionals",
            "courses",
            "cs",
            "cs312",
            "dorms",
            "Events",
            "meals",
            "ross",
            "sports",
            "theatre",
          ]);
        },
      });
    });

    test("GET /api/categories should return specific subcategories", async () => {
      //doesn't test for nested subcategories yet
      await testApiHandler({
        rejectOnHandler: true,
        handler: categories_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          await expect(res.json()).resolves.toMatchObject(
            category_data.filter((category) => category.parentId.toBe(0))
          );
        },
      });
    });

    test("GET /api/posts should return all posts", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: posts_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          await expect(res.json()).resolves.toMatchObject(post_data);
        },
      });
    });

    test("GET /api/posts?category should return a subset of posts for a categories", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: posts_endpoint,
        url: "/api/posts?category=courses",
        test: async ({ fetch }) => {
          const res = await fetch();
          await expect(res.json()).resolves.toMatchObject(
            post_data.filter((post) => post.tag.toBe(0))
          );
        },
      });
    });
  });

  describe("Tag testing", () => {
    test("Test tag relations?", async () => {
      //might be necessary
    });
  });
});
