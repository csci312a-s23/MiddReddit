import * as dayjs from "dayjs";
import CommentEditor from "./CommentEditor";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Comment({
  comment,
  submitComment,
  indent,
  setLatestCommentUpvote,
}) {
  const [enterReplyColor, setEnterReplyColor] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false); //don't need authz to show editor, but to submit comment
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const submitUpvote = async (upvoteOrDownVote) => {
    const newCommentUpvote = {
      commentId: comment.id,
      upvote: upvoteOrDownVote,
      posted: new Date().toISOString(),
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
    setLatestCommentUpvote(submittedCommentUpvote);
  };

  const replyColor = enterReplyColor ? "black" : "blue"; //might change this to an actual link
  //to get the pointer thinger on the curser to change
  const handleClick = () => {
    setEditorVisible(true);
  };

  const upvotes = comment.votes.reduce(
    (accumulator, vote) => (vote.upvote ? accumulator + 1 : accumulator - 1),
    0
  );
  const { data: session } = useSession();
  const userId = session ? session.user.id : 0;

  let upvoteColor,
    downvoteColor = "black";

  const userVote = comment.votes.filter(
    (vote) => parseInt(vote.ownerId) === userId
  );
  const userUpvoteOrDownvote = userVote[0] ? userVote[0].upvote : undefined; //extra step so not indexing empty array

  if (userUpvoteOrDownvote !== undefined) {
    //weird ternary condition here
    userUpvoteOrDownvote ? (upvoteColor = "blue") : (downvoteColor = "orange");
  }

  const childrenComments = comment.children.map((child) => (
    <Comment
      key={child.id}
      comment={child}
      indent={indent + 1}
      submitComment={submitComment}
      setLatestCommentUpvote={setLatestCommentUpvote}
    />
  )); //
  return (
    <div style={{ paddingLeft: 20 * indent }}>
      <Paper sx={{ my: 2, pl: 1, ml: 1 }} elevation={4}>
        <Stack direction="row">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mr: 2 }}
            spacing={0}
          >
            <ArrowUpwardRoundedIcon
              style={{ marginTop: "0px", color: upvoteColor }}
              onClick={() => submitUpvote(true)}
            />
            <p style={{ margin: "1px", marginLeft: "2px" }}>{upvotes}</p>

            <ArrowDownwardRoundedIcon
              style={{ color: downvoteColor }}
              onClick={() => submitUpvote(false)}
            />
          </Stack>
          <div>
            <p style={{ marginBottom: "6px" }}>
              {comment.author.name} &emsp;{" "}
              <em>{dayjs(comment.posted).fromNow()}</em>{" "}
            </p>
            <p onClick={() => console.log(comment)} style={{ margin: "0px" }}>
              {comment.contents}
            </p>

            <p
              style={{ color: replyColor, fontSize: 15, marginTop: "6px" }}
              onMouseEnter={() => setEnterReplyColor(!enterReplyColor)}
              onMouseLeave={() => setEnterReplyColor(!enterReplyColor)}
              onClick={handleClick}
            >
              Reply
            </p>
          </div>
        </Stack>
      </Paper>

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
