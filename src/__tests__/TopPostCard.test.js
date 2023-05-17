import { render } from "@testing-library/react";
import TopPostCard from "../components/TopPostCard";

describe("TopPostCard: TopPostCard tests", () => {
  let post;
  const goToPostHandler = jest.fn();

  beforeEach(() => {
    post = {
      title: "Title of sample post",
      contents: "Contents of the sample post",
      posted: new Date("2020-06-10T14:54:40Z").toISOString(),
      upvotes: 0,
    };
    goToPostHandler.mockReset();
  });
  test("TopPostCard: Top post is displayed", () => {
    const { getByText } = render(
      <TopPostCard post={post} goToPost={goToPostHandler} />
    );

    expect(getByText(post.title)).toBeInTheDocument();
    expect(getByText(post.title)).toBeVisible();
  });
});
