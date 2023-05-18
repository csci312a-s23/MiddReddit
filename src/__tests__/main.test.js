import { render, act } from "@testing-library/react";
import App from "../pages/_app";
import { useSession, SessionProvider } from "next-auth/react";
import MainPage from "../pages/index.js";

jest.mock("next/router", () => require("next-router-mock"));

// Mock the NextAuth package
jest.mock("next-auth/react");

// For some reason "fetch" is no longer global and this alternate import
// approach seems to be required: https://github.com/wheresrhys/fetch-mock-jest#node-fetch
jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());
const fetchMock = require("node-fetch");
//eslint-disable-next-line  react/display-name
jest.mock("../components/TopPostDisplay.js", () => () => {
  return <mock-TopPosts data-testid="topposts" />;
});
describe("Client-side testing of secure pages", () => {
  beforeEach(() => {
    fetchMock.get("/api/posts", () => {
      return [];
    });
    fetchMock.get("/api/posts?top=10", () => {
      return [];
    });
    fetchMock.get("/api/categories", () => {
      return [];
    });
  });

  afterEach(() => {
    // Clear all mocks between tests
    jest.resetAllMocks();
  });

  test("Render app with session provider", async () => {
    // When rendering _app, (or any component containing the SessionProvider component)
    // we need to mock the provider to prevent NextAuth from attempting to make API requests
    // for the session.
    SessionProvider.mockImplementation(({ children }) => (
      <mock-provider>{children}</mock-provider>
    ));

    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });

    // Set the session prop expected by our _app component
    render(<App Component={MainPage} pageProps={{ session: undefined }} />);

    // You were getting errors about actions not wrapped in `act`. That is result of asynchronous actions
    // making change to your component after all asserts have completed. The "right" fix is to use
    // the testing libraries asynchronous helpers to wait for the expected changes to take place. Alternately
    // you could manually wait for outstanding promises to complete (wrapping the wait in an act call)
    // with the following code. See https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning.
    await act(async () => {
      await new Promise(process.nextTick);
    });
  });
});
