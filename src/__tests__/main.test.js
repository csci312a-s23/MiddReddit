import { render } from "@testing-library/react";
//import { testApiHandler } from "next-test-api-route-handler";
//import { knex } from "../../knex/knex.js";
//pages
import MainApp from "../pages/_app.js";
import MainPage from "../pages/index.js";
//endpoints
//import specific_post_endpoint from "../pages/api/posts/[id]/index.js";
//data
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
    //return knex.migrate.rollback().then(() => knex.migrate.latest());
  });
  beforeEach(() => {
    getServerSession.mockResolvedValue({
      user: {
        name: "Jeff",
        email: "Jeff@gmail.com",
        id: 1,
      },
    });
    //return knex.seed.run();
  });
  afterEach(() => {
    getServerSession.mockReset();
  });
  jest.mock("next/router", () => require("next-router-mock"));

  describe("End-to-end testing", () => {
    test.skip("Render index.js component", () => {
      render(<MainApp Component={MainPage} />);
    });
  });
});
