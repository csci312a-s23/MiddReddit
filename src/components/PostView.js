/*
  PostView.js

  Users can view and comment on a post, editing it if they are the author.
*/
/* eslint-disable quotes */

export default function PostView({ post, allowEdit }) {
  if (allowEdit) {
    return (
      <div>
        <button onClick={() => handleClick("add")}>Add</button>
        {allowEdit && <button onClick={() => handleClick("edit")}>Edit</button>}
      </div>
    );
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
      <p>{post.category[0].name}</p>
      {/*eslint-disable-line */}
      <p suppressHydrationWarning>{new Date(post.posted).toLocaleString()}</p>
    </div>
  );
}
