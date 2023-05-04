import Comment from "./Comment";

export default function CommentView({ comments }) {
  const commentComponents = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return (
    <>
      <h3>Comments</h3>
      <div>{commentComponents}</div>
    </>
  );
}
