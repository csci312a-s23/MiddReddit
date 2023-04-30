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
import { TextField, Stack, Autocomplete, Button } from "@mui/material";

export default function Editor({
  post,
  categories,
  complete,
  setCreatePost,
  setOpenRightSideBar,
}) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [contents, setContents] = useState(post ? post.contents : "");
  const [postCategory, setPostCategory] = useState();

  if (!categories) {
    // fetch categories here if solve the refresh -> error
    // fetch("/api/categories")
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     categories = data;
    //   })
  }

  const submitPost = (submit) => {
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
      // TODO: inaddition wants to append to the tag table to add new category to post
      // For post category submission, I think we should create a model for the Tag table.
    }
  };
  return (
    <div>
      <Stack spacing={2} sx={{ width: 600 }}>
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
        <Autocomplete
          disablePortal
          value={postCategory}
          id="category-search-bar"
          options={categories.map((cat) => cat.name)}
          onChange={(event, newValue) => {
            setPostCategory(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add a category"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => submitPost(true)}
            disabled={title === ""}
          >
            Post
          </Button>
          <Button
            onClick={() => {
              submitPost(false);
              setOpenRightSideBar(true);
              setCreatePost(true);
            }}
          >
            Cancel
          </Button>
        </Stack>
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
