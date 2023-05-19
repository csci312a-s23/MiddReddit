import { useRouter } from "next/router";
import Editor from "../../../components/Editor";
import PostShape from "../../../components/PostShape";

export default function PostEditor({ currentPost }) {
  const router = useRouter();
  function complete() {
    () => {
      router.back();
    };
  }
  return <Editor post={currentPost} complete={complete} />;
}

PostEditor.propTypes = {
  currentPost: PostShape,
};
