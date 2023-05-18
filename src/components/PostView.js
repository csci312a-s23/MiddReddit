/*
  PostView.js

  Users can view and comment on a post, editing it if they are the author.
*/

import PostShape from "./PostShape";

export default function PostView({ post }) {
  let category;
  if (post.category.length > 0) {
    category = post.category[0].name;
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
      <p>{category}</p>
      {/*eslint-disable-line */}
      <p suppressHydrationWarning>{new Date(post.posted).toLocaleString()}</p>
    </div>
  );
}

PostView.propTypes = {
  post: PostShape.isRequired,
};
