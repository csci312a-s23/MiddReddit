import Editor from "../../components/Editor";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function PostCreator({
  goToPost,
  categories,
  categoriesList,
  setOpenRightSideBar,
}) {
  const router = useRouter();

  const submitTag = async (postId, categoryId) => {
    if (!postId || !categoryId) {
      return;
    }
    const newTag = {
      postId: postId,
      categoryId: categoryId,
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
        categoriesList={categoriesList}
        setOpenRightSideBar={setOpenRightSideBar}
      />
    </main>
  );
}

PostCreator.propTypes = {
  goToPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  categoriesList: PropTypes.array.isRequired,
  setOpenRightSideBar: PropTypes.func.isRequired,
};
