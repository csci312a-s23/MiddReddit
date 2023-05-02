import { useRouter } from "next/router";
import Editor from "../../../components/Editor";
//import PropTypes from "prop-types";
import PostShape from "../../../components/PostShape";

export default function PostEditor({ currentPost }) {
  const router = useRouter();
  function complete() {
    () => {
      router.back();
    };
  }

  //   async function complete(newPost) {
  //     if (newPost) {
  //       const response = await fetch(`/api/articles/${newPost.id}`, {
  //         method: "PUT",
  //         body: JSON.stringify(newPost),
  //         headers: new Headers({
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         }),
  //       });
  //       if (response.ok) {
  //         const putData = await response.json();
  //         setCurrentPost(putData);
  //       }
  //     } else {
  //       router.back();
  //     }
  //   }

  return <Editor article={currentPost} complete={complete} />;
}

PostEditor.propTypes = {
  currentPost: PostShape,
};
