/*
    Editor.js
     
    This define a editor for user to create a new post.

    props:
      post - object with `title` and `contents` fields of the component (optional)
      complete - function to call on completion (required)
*/
import { useState } from "react";
import PropTypes from "prop-types";
import PostShape from "./PostShape";
import {
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
//import styles from "../styles/MiddReddit.module.css";

export default function Editor({
  post,
  categories,
  complete,
  setCreatePost,
  setOpenRightSideBar,
}) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [contents, setContents] = useState(post ? post.contents : "");

  let categoryDisp;
  if (categories) {
    const currentCategory = [...categories];
    categoryDisp = currentCategory.map((category) => (
      <ToggleButton key={category.id} value={category.name}>
        {category.name}
      </ToggleButton>
    ));
  }

  function submitPost(submit) {
    if (!submit) {
      complete();
    } else {
      complete({
        ...post,
        title: title,
        contents: contents,
        upvotes: 0,
        posted: new Date().toISOString(),
      });
    }
  }

  return (
    <div>
      <TextField
        required
        fullWidth
        margin="normal"
        id="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={!title}
        helperText={!title ? "Add a title for your post" : " "}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        value={contents}
        onChange={(event) => setContents(event.target.value)}
        helperText={!contents ? "What do you want to post about?" : ""}
        margin="normal"
        id="contents"
        label="Contents"
      />
      <ToggleButtonGroup color="primary" exclusive size="small">
        {categoryDisp}
      </ToggleButtonGroup>
      {
        //Need to add onClick so that the button reappears
      }
      <Stack spacing={2} direction="row">
        <button onClick={() => submitPost(true)} disabled={title === ""}>
          Post
        </button>
        <button
          onClick={() => {
            submitPost(false);
            setOpenRightSideBar(true);
            setCreatePost(true);
          }}
        >
          Cancel
        </button>
      </Stack>
    </div>
  );
}

Editor.propTypes = {
  post: PostShape,
  categories: PropTypes.array.isRequired,
  setCreatePost: PropTypes.func.isRequired,
  setOpenRightSideBar: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
};
