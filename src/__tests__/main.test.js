import MainApp from "@/pages/_app";
import { render } from "@testing-library/react";
/*
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
*/
// Replace the router with the mock
jest.mock("next/router", () => require("next-router-mock"));

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<MainApp />);
  });
});
