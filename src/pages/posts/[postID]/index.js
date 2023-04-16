import PostView from "../../../components/PostView";
import { useRouter } from "next/router";
//import data from "../../../../data/seedPost.json"; //will be a database thing
import { useEffect, useState } from "react";

export default function Post({}) {
  const [postToDisplay, setPostToDisplay] = useState();
  const router = useRouter();

  const { postID } = router.query;

  async function getPostFromId(id) {
    fetch(`/api/posts/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPostToDisplay(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getPostFromId(postID);
  }, [postID]);

  const allowEdit = false;

  /*if (currentPost.author === user.name)
    {
        allowEdit = true;
    } */

  return (
    <>
      {postToDisplay && <PostView allowEdit={allowEdit} post={postToDisplay} />}
    </>
  );
}
