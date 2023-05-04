import { render } from "@testing-library/react";
//import { testApiHandler } from "next-test-api-route-handler";
//import { knex } from "../../knex/knex.js";
//pages
import MainApp from "../pages/_app.js";
import MainPage from "../pages/index.js";
//endpoints
//import specific_post_endpoint from "../pages/api/posts/[id]/index.js";
//data
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");
import { withMockAuth } from "@tomfreudenberg/next-auth-mock/jest";

//import client, { Session } from "next-auth/next";
//jest.mock("next-auth/client");

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
    /*jest.spyOn(useSession).mockResolvedValue({
      data: [
        {
          user: "jeff",
          id: 1,
          email: "email"
        }
      ]
    }); */
    //const { data : session, status } = useSession();
    useSession.mockResolvedValue({
      data: {
        user: {
          id: 1,
          name: "Jeff",
          email: "jeff@gmail.com",
        },
        expires: 1,
      },
      status: "authenticated",
    });
  });

  //return knex.seed.run();

  afterEach(() => {});
  jest.mock("next/router", () => require("next-router-mock"));

  describe("End-to-end testing", () => {
    test("Render index.js component", () => {
      render(withMockAuth(<MainApp Component={MainPage} />, "userAuthed"));
    });
  });
});
