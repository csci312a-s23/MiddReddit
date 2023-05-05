import Comment from "./Comment";
import CommentEditor from "./CommentEditor";
export default function CommentView({ comments, submitComment }) {
  const commentComponents = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return (
    <>
      <h3>Comments</h3>
      <div>
        <CommentEditor submitComment={submitComment} />
      </div>
      <div>{commentComponents}</div>
    </>
  );
}
