/**
 * @jest-environment node
 *
 * Use Node environment for server-side tests to avoid loading browser libraries
 */

import { testApiHandler } from "next-test-api-route-handler";
//pages
//endpoints
import categories_endpoint from "../pages/api/categories.js";
import posts_endpoint from "../pages/api/posts/index.js";
import specific_post_endpoint from "../pages/api/posts/[id]/index.js";
//data
import category_data from "../../data/test-data/test-seedCategory.json";
import { knex } from "../../knex/knex.js";

import post_data from "../../data/test-data/test-seedPost.json";
import { getServerSession } from "next-auth/next";
jest.mock("next-auth/next");
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
  afterAll(() => {
    return knex.destroy();
  });
  beforeEach(() => {
    getServerSession.mockResolvedValue({
      user: {
        id: 1,
      },
    });

    return knex.seed.run();
  });
  afterEach(() => {
    getServerSession.mockReset();
  });

  describe("Category Endpoint Testing", () => {
    /*tests to complete:
        POST a post
        POST a comment
        GET a single post
        PUT a single post
        PUT like/dislike
        *Remember to uncomment the imports
    */
    test("GET /api/categories should return all parent categories", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: categories_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          const names = [
            "courses",
            "confessionals",
            "meals",
            "sports",
            "dorms",
            "events",
          ];
          const res_names = await res.json();
          const fetchNames = res_names.map((category) => category.name);
          expect(fetchNames).toMatchObject(names);
        },
      });
    });
    test("GET /api/categories should return categories with children object", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: categories_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          const parent_categories = await res.json();
          const parent_object = parent_categories.filter(
            (category) => category.name === "meals"
          )[0].children;

          const child_object = category_data.filter(
            (category) => category.name === "ross"
          )[0];
          child_object["children"] = []; //have to include the children object, not specified in seed data
          child_object["id"] = 19;
          expect(parent_object[0]).toMatchObject(child_object);
        },
      });
    });

    test("GET /api/categories should not return child categories", async () => {
      //doesn't test for nested subcategories yet
      await testApiHandler({
        rejectOnHandler: true,
        handler: categories_endpoint,
        test: async ({ fetch }) => {
          const res = await fetch();
          const res_object = await res.json();
          const fetchNames = res_object.map((category) => category.name);
          const child_category = "cs312";
          expect(fetchNames).not.toContainEqual(child_category);
        },
      });
    });
  });
  describe("Post Endpoint Testing", () => {
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

    test("GET /api/posts?category should return a subset of posts for a category", async () => {
      await testApiHandler({
        rejectOnHandler: true,
        handler: posts_endpoint,
        url: "/api/posts?category=courses",
        test: async ({ fetch }) => {
          const courses_posts_titles = [
            "Midd Snow Ball",
            "2/6 Ross Meal",
            "3/17 Indoor Meet",
          ];

          const res = await fetch();
          const res_object = await res.json();
          const res_posts_names = res_object.map((post) => post.title);

          expect(res_posts_names).toMatchObject(courses_posts_titles);
        },
      });
    });

    test("GET /api/posts/[id] should return a single post", async () => {
      const post = await knex("Post").where("title", "Midd Snow Ball").first();
      await testApiHandler({
        rejectOnHandler: true,
        handler: specific_post_endpoint,
        paramsPatcher: (params) => (params.id = post.id), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          const res = await fetch();
          await expect(res.json()).resolves.toMatchObject(post_data[0]);
        },
      });
    }, 6000);
    describe("Unauthenticated edits are rejected", () => {
      beforeEach(() => {
        getServerSession.mockResolvedValue(undefined);
      });
      test("Unauthenticated POST", async () => {
        const newPost = {
          id: 0,
          title: "Green Eggs and Ham",
          author: "Dr Suess",
          contents: "I don't like green eggs and ham",
          posted: "",
          upvotes: 0,
        };
        await testApiHandler({
          rejectOnHandlerError: false, // We want to assert on the error
          handler: posts_endpoint,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newPost),
            });
            expect(res.ok).toBe(false);
            expect(res.status).toBe(403);
          },
        });
      });
    });
  });

  /* describe("Tag testing", () => {
    
  }); */
});
