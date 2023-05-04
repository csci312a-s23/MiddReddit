/*
  PostView.js

  Users can view and comment on a post, editing it if they are the author.
*/

/* eslint-disable quotes */
import PropTypes from "prop-types";
import PostShape from "./PostShape";

export default function PostView({ post, allowEdit }) {
  if (allowEdit) {
    return (
      <div>
        <button onClick={() => handleClick("add")}>Add</button>
        {allowEdit && <button onClick={() => handleClick("edit")}>Edit</button>}
      </div>
    );
  }
  let category;
  if (post.category.length > 0) {
    category = post.category[0].name;
  }
  console.log(post.comments);
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
  post: PostShape,
  allowEdit: PropTypes.bool.isRequired,
};
