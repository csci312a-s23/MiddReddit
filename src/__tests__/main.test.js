import { render, screen } from "@testing-library/react";
import App from "../pages/_app";
//nimport Secure from "../pages/secure";
//import { useRouter } from "next/router";
import { useSession, SessionProvider } from "next-auth/react";
import MainPage from "../pages/index.js";
// Mock the NextAuth package
jest.mock("next-auth/react");

describe("Client-side testing of secure pages", () => {
  afterEach(() => {
    // Clear all mocks between tests
    jest.resetAllMocks();
  });

  /* test("Renders secure portions of page when logged in", async () => {
    // When rendering an individual page we can just mock useSession (in this case to
    // simulate an authenticated user)
    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });
    render(<Secure />);
    expect(useSession).toBeCalledWith({ required: true });
    expect(screen.getByText(/\{ "user": \{ "id": 1 \}/i)).toBeInTheDocument();
  });

  test("Doesn't render secure portions when not logged in", async () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(<Secure />);
    expect(
      screen.queryByText(/\{ "user": \{ "id": 1 \}/i)
    ).not.toBeInTheDocument();
  });
*/
  test("Render app with session provider", () => {
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
    expect(screen.getByText(/\{ "user": \{ "id": 1 \}/i)).toBeInTheDocument();
  });
});
