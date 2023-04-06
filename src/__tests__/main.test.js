import Home from "@/pages/_app";
import { render } from "@testing-library/react";

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
