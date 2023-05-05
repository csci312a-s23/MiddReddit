import { useState } from "react";
import { TextField, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
export default function CommentEditor({
  parentComment,
  submitComment,
  setEditorVisible,
}) {
  const [contents, setContents] = useState();
  const collapseEditor = () => {
    if (setEditorVisible) {
      setEditorVisible(false);
    }
  }; //need a wrapper function because sometimes we call editor without collapse option
  const router = useRouter();
  const { postID } = router.query;
  const parentID = parentComment ? parentComment.id : null;
  const complete = (submit) => {
    if (!submit) {
      submitComment();
    } else {
      const newComment = {
        contents: contents,
        postId: parseInt(postID),
        parentId: parentID,
        posted: new Date().toISOString(),
      };
      if (0 === 0) {
        //if postCategory
        submitComment(newComment, 0);
        setContents("");
        collapseEditor();
      } else {
        submitComment(newPost);
      }
    }
  };
  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={contents}
        onChange={(event) => setContents(event.target.value)}
        margin="normal"
        id="contents"
        label="Comment"
      />
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={() => complete(true)}
          disabled={contents === ""}
        >
          Post
        </Button>
        <Button
          onClick={() => {
            complete(false);
            collapseEditor();
            //setOpenRightSideBar(true);
            //setCreatePost(true);
          }}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
