import PostView from "../../../components/PostView";

export default function Post({ currentPost }) {
  const allowEdit = false;

  /*if (currentPost.author === user.name)
    {
        allowEdit = true;
    } */

  return (
    <>
      <PostView currentPost={currentPost} allowEdit={allowEdit} />
    </>
  );
}
