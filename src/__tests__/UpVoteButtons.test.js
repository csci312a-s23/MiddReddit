import { render } from "@testing-library/react";
import { useSession, SessionProvider } from "next-auth/react";
import UpVoteButtons from "../components/UpVoteButtons";

jest.mock("next-auth/react");

jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());
const fetchMock = require("node-fetch");
describe("UpVoteButtons: UpVoteButtons tests", () => {
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
      votes: [
        {
          id: 0,
          ownerId: 0,
          postId: 0,
          upvote: true,
        },
      ],
    };
    goToPostHandler.mockReset();
    setLatestUpvoteHandler.mockReset();

    fetchMock.post(`/api/posts/${post.id}/postUpvotes`, () => {
      return [];
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("UpVoteButtons: UpVoteButtons correctly show upvote count", () => {
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

    const { getByText } = render(
      <UpVoteButtons post={post} setLatestUpvote={setLatestUpvoteHandler} />
    );

    expect(getByText("1")).toBeInTheDocument();
  });
});
