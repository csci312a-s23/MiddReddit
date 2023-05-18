import { render } from "@testing-library/react";
import PostView from "../components/PostView";

describe("PostView: PostView tests", () => {
  let post;

  beforeEach(() => {
    post = {
      id: 0,
      title: "Title of sample post",
      contents: "Contents of the sample post",
      posted: new Date("2020-06-10T14:54:40Z").toISOString(),
      category: [],
      upvotes: 0,
    };
  });

  test("PostView: PostView render post", () => {
    const { getByText } = render(<PostView post={post} />);

    expect(getByText(post.title)).toBeInTheDocument();
    expect(getByText(post.title)).toBeVisible();

    expect(getByText(post.contents)).toBeInTheDocument();
    expect(getByText(post.contents)).toBeVisible();
  });
});
