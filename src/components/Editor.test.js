import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "./Editor";

describe("Editor: Editor tests", () => {
  let post, categories;
  const completeHandler = jest.fn();

  beforeEach(() => {
    post = {
      title: "Title of sample post",
      contents: "Contents of the sample post",
      posted: new Date("2020-06-10T14:54:40Z").toISOString(),
      upvotes: 0,
    };
    categories = [{ name: "A" }, { name: "B" }];
    completeHandler.mockReset();
  });

  test("Editor: Post button is disabled without title", () => {
    const { container } = render(
      <Editor
        submitPost={completeHandler}
        categoriesList={categories}
        categories={categories}
      />
    );

    const titleInput = container.querySelector("input[type=text]");
    expect(titleInput).toHaveValue("");

    const postButton = screen.getByRole("button", { name: "Post" });
    expect(postButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: post.title } });
    expect(titleInput).toHaveValue(post.title);
    expect(postButton).toBeEnabled();
  });
});
