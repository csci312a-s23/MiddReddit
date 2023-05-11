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
        {comment.author.name} <em>{dayjs(comment.posted).fromNow()}</em>{" "}
      </p>
      <p>{comment.contents}</p>
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
