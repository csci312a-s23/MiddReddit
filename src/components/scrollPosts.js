export default function ScrollPost({ post }) {
  return (
    <li>
      <h4>{post.title}</h4>
      <em>
        {post.owner} - {new Date().toLocaleString()}
      </em>
      <p>{post.contents} </p>
    </li>
  );
}
