import { render } from "@testing-library/react";
import { knex } from "../../knex/knex.js";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

// components
import MainApp from "../pages/_app.js";
import MainPage from "../pages/index.js";

// Replace the router with the mock
jest.mock("next/router", () => require("next-router-mock"));

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

describe("End-to-end testing", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    // Reset contents of the test database
    return knex.seed.run();
  });

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
});
