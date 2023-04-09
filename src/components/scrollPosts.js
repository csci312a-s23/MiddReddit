/*
  ScrollPosts.js

  Displays the posts within our scroll display, when clicked, takes user to the
  corresponding page for the post (PostView component).
*/

import PostView from "./PostView";

export default function ScrollPost({ post }) {
  //let allowEdit = false;

  const currentPost = post;

  return (
    <li>
      <h4>{post.title}</h4>
      <em>
        {post.owner} - {new Date().toLocaleString()}
      </em>
      <p>{post.contents} </p>
      onClick={() => <PostView post={currentPost} />}
    </li>
  );
}
