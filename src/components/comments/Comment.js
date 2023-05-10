import * as dayjs from "dayjs";
import CommentEditor from "./CommentEditor";
import { useState } from "react";
export default function Comment({ comment, submitComment, indent }) {
  const [enterReplyColor, setEnterReplyColor] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false); //don't need authz to show editor, but to submit comment
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const replyColor = enterReplyColor ? "black" : "blue"; //might change this to an actual link
  //to get the pointer thinger on the curser to change
  const handleClick = () => {
    setEditorVisible(true);
  };
  const submitUpvote = async (upvoteOrDownVote) => {
    console.log(comment);
    const newCommentUpvote = {
      commentId: comment.id,
      upvote: upvoteOrDownVote,
    };
    const params = {
      method: "POST",
      body: JSON.stringify(newCommentUpvote),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch(
      `/api/posts/${comment.post.id}/commentUpvotes`,
      params
    );
    const submittedCommentUpvote = await response.json();

    console.log(submittedCommentUpvote);
  };
  const upvotes = comment.votes.reduce(
    (accumulator, vote) => (vote.upvote ? accumulator + 1 : accumulator - 1),
    0
  );

  const childrenComments = comment.children.map((child) => (
    <Comment
      key={child.id}
      comment={child}
      indent={indent + 1}
      submitComment={submitComment}
    />
  )); //
  return (
    <div style={{ paddingLeft: 20 * indent }}>
      <p>
        {comment.author.name} &emsp; <em>{dayjs(comment.posted).fromNow()}</em>{" "}
      </p>
      <p onClick={() => console.log(comment)}>{comment.contents}</p>
      <p onClick={() => submitUpvote(true)}>Upvote {upvotes}</p>
      <p onClick={() => submitUpvote(false)}>Downvote </p>
      <p
        style={{ color: replyColor, fontSize: 15 }}
        onMouseEnter={() => setEnterReplyColor(!enterReplyColor)}
        onMouseLeave={() => setEnterReplyColor(!enterReplyColor)}
        onClick={handleClick}
      >
        Reply
      </p>

      {editorVisible && (
        <CommentEditor
          parentComment={comment}
          submitComment={submitComment}
          setEditorVisible={setEditorVisible}
        />
      )}
      {childrenComments}
    </div>
  );
}
