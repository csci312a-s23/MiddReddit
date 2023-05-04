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

//import mockRouter from "next-router-mock";
//import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

// Replace the router with the mock
//jest.mock("next/router", () => require("next-router-mock"));

/*
// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/category/[catName]",
    "/posts/[postID]",
    "/posts/create",
    "/index",
  ])
);

// We wrap the actual fetch implementation during testing so that we can introduce
// the absolute URL (needed on the server but not on the browser)
const originalFetch = global.fetch;
global.fetch = (url, ...params) => {
  if (typeof url === "string" && url.startsWith("/")) {
    return originalFetch(`http://0.0.0.0:3000${url}`, ...params);
  }
  return originalFetch(url, ...params);
};
*/
describe("MiddReddit API", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
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

    //mockRouter.setCurrentUrl("/");
    // Reset contents of the test database
    //return knex.seed.run();
  });

  //return knex.seed.run();

  afterEach(() => {});
  jest.mock("next/router", () => require("next-router-mock"));
/*
  describe.skip("Testing MiddReddit end-to-end behavior", () => {
    test("Render index.js component", () => {
      const mockSession = {
        expires: "1",
        user: { email: "a", name: "Delta", image: "c" },
      };
      const mockUseSession = jest.fn();

      mockUseSession.mockReturnValueOnce([mockSession, false]);

      const pageProps = { mockSession };

      render(<MainApp Component={MainPage} pageProps={pageProps} />);
    });
  });
  */
  describe("End-to-end testing", () => {
    test("Render index.js component", () => {
      render(withMockAuth(<MainApp Component={MainPage} />, "userAuthed"));
    });
  });
});
