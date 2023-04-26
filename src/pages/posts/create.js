import Editor from "../../components/Editor";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function PostCreator({
  goToPost,
  categories,
  setOpenRightSideBar,
  setCreatePost,
}) {
  const router = useRouter();
  const complete = async (post) => {
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
        goToPost(newPost);
      }
    } else {
      router.back();
    }
  };

  return (
    <main>
      <Editor
        complete={complete}
        categories={categories}
        setCreatePost={setCreatePost}
        setOpenRightSideBar={setOpenRightSideBar}
      />
    </main>
  );
}

PostCreator.propTypes = {
  goToPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setOpenRightSideBar: PropTypes.func.isRequired,
  setCreatePost: PropTypes.func.isRequired,
};
