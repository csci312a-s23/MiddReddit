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
  categoriesListUO,
  submitPost,
  setOpenRightSideBar,
}) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [contents, setContents] = useState(post ? post.contents : "");
  const [postCategory, setPostCategory] = useState(null);

  const complete = (submit) => {
    if (!submit) {
      submitPost();
    } else {
      const newPost = {
        title: title,
        contents: contents,
        upvotes: 0,
        posted: new Date().toISOString(),
      };
      if (postCategory) {
        submitPost(newPost, postCategory.id);
      } else {
        submitPost(newPost);
      }
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
          options={categoriesListUO}
          getOptionLabel={(option) => option.name}
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
            onClick={() => complete(true)}
            disabled={title === ""}
          >
            Post
          </Button>
          <Button
            onClick={() => {
              complete(false);
              setOpenRightSideBar(true);
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
  submitPost: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  categoriesListUO: PropTypes.array.isRequired,
  setOpenRightSideBar: PropTypes.func,
};
