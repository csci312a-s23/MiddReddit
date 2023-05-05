import PostView from "../../../components/PostView";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommentView from "@/components/comments/CommentView";
export default function Post({}) {
  const [postToDisplay, setPostToDisplay] = useState();
  const router = useRouter();
  const [latestComment, setLatestComment] = useState(); //using to trigger rerender upon comment
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
  }, [postID, latestComment]);

  const submitComment = async (comment) => {
    //had categoryId as a parameter, not sure if that needs to stay
    if (comment) {
      const params = {
        method: "POST",
        body: JSON.stringify(comment),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(`/api/posts/${postID}/comments`, params);
      if (response.ok) {
        const newComment = await response.json();
        setLatestComment(newComment);
        console.log(newComment);
        /* if (categoryId) {
          await submitTag(newPost.id, categoryId);
        } */
      }
    } /*else {
      router.back();
    }*/
  };

  const allowEdit = false;

  /*if (currentPost.author === user.name)
    {
        allowEdit = true;
    } */

  return (
    <>
      {postToDisplay && <PostView allowEdit={allowEdit} post={postToDisplay} />}
      {postToDisplay && (
        <CommentView
          comments={postToDisplay.comments}
          submitComment={submitComment}
        />
      )}
    </>
  );
}
