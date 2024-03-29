import Editor from "../../components/Editor";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function PostCreator({
  goToPost,
  categories,
  categoriesListUO,
  setOpenRightSideBar,
}) {
  const router = useRouter();

  const submitTag = async (postId, categoryId) => {
    if (!postId || !categoryId) {
      return;
    }
    const newTag = {
      post: postId,
      category: categoryId,
    };
    const params = {
      method: "POST",
      body: JSON.stringify(newTag),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch("/api/tag", params);
    if (!response.ok) {
      // updated tag table
      console.error("tag update failed");
    }
  };

  const submitPost = async (post, categoryId) => {
    if (post) {
      console.log("wrong create");
      const params = {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch("/api/posts", params);
      if (response.ok) {
        const newPost = await response.json();

        if (categoryId) {
          //Problem Here, separate ids
          await submitTag(newPost.id, categoryId);
        }
        goToPost(newPost);
      }
    } else {
      router.back();
    }
  };

  return (
    <main>
      <Editor
        submitPost={submitPost}
        categories={categories}
        categoriesListUO={categoriesListUO}
        setOpenRightSideBar={setOpenRightSideBar}
      />
    </main>
  );
}

PostCreator.propTypes = {
  goToPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  categoriesListUO: PropTypes.array.isRequired,
  setOpenRightSideBar: PropTypes.func.isRequired,
};
