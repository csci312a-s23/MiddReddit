import { render, screen, fireEvent } from "@testing-library/react";
import ScrollPost from "../components/ScrollPosts";

//eslint-disable-next-line  react/display-name
jest.mock("../components/UpVoteButtons.js", () => () => {
  return <mock-UpVoteButtons data-testid="upvotebuttons" />;
});

describe("ScrollPost: ScrollPost tests", () => {
  let post;
  const goToPostHandler = jest.fn();
  const setLatestUpvoteHandler = jest.fn();

  beforeEach(() => {
    post = {
      id: 0,
      title: "Title of sample post",
      contents: "Contents of the sample post",
      posted: new Date("2020-06-10T14:54:40Z").toISOString(),
      userMadeBy: {
        name: "test user",
      },
      upvotes: 0,
    };
    goToPostHandler.mockReset();
    setLatestUpvoteHandler.mockReset();
  });

  test("ScrollPost: Post content is rendered", () => {
    const { getByText } = render(
      <ScrollPost
        post={post}
        goToPost={goToPostHandler}
        setLatestUpvote={setLatestUpvoteHandler}
      />
    );

    expect(getByText(post.title)).toBeInTheDocument();
    expect(getByText(post.title)).toBeVisible();

    expect(getByText(post.contents)).toBeInTheDocument();
    expect(getByText(post.contents)).toBeVisible();
  });

  test("ScrollPost: Correct number of posts are displayed", async () => {
    render(
      <ScrollPost
        post={post}
        goToPost={goToPostHandler}
        setLatestUpvote={setLatestUpvoteHandler}
      />
    );
    const posts = await screen.findAllByTestId("post-display");
    expect(posts).toHaveLength(1);
  });

  test("ScrollPost: Click on post direct user to post view", async () => {
    render(
      <ScrollPost
        post={post}
        goToPost={goToPostHandler}
        setLatestUpvote={setLatestUpvoteHandler}
      />
    );

    const postComponent = await screen.findByText(post.title);
    fireEvent.click(postComponent);

    expect(goToPostHandler).toHaveBeenCalled();
  });
});
