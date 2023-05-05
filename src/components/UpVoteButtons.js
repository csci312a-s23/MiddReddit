/*
  upVoteButton.js

  The `upVoteButton` component is a collection of upvote and downvote buttons.

  The bar has two states determined by `allowEdit`. If false, Buttons disabled.

  props:
    post - Post that gives up upvotes
    allowEdit - a Boolean indicating if there is something that could be edited (required)
*/

import PropTypes from "prop-types";
import PostShape from "./PostShape";
//MUI Imports
import { Box, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import { blue } from "@mui/material/colors";

const updateVotes = async (post) => {
  const params = {
    method: "PUT",
    body: JSON.stringify(post),
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  const response = await fetch(`/api/posts/${post.id}`, params);
  if (response.ok) {
    // success update
    const updatedPost = await response.json();
    console.log(updatedPost);
  }
};

export default function UpVoteButtons({ post, allowVote }) {
  const [upVotes, setUpVotes] = useState(post.upvotes);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [upButton, setUpButton] = useState(false);
  const [downButton, setDownButton] = useState(false);
  const primary = blue[900];
  const secondary = blue[500];

  function update(setButton, bool) {
    setUpVotes(post.upvotes);
    setButtonPressed(bool);
    setButton(bool);
  }

  return (
    <Box position="static">
      <Stack alignItems="center">
        <IconButton
          disabled={allowVote || downButton}
          onClick={() => {
            if (buttonPressed === false) {
              post.upvotes = post.upvotes + 1;
              update(setUpButton, true);
            } else {
              post.upvotes = post.upvotes - 1;
              update(setUpButton, false);
            }
            // fetch the database
            updateVotes(post);
          }}
        >
          <ThumbUpIcon
            sx={{ color: upButton ? primary : secondary, position: "static" }}
          />
        </IconButton>

        <Typography color="blue"> {upVotes} </Typography>

        <IconButton
          disabled={allowVote || upButton}
          onClick={() => {
            if (buttonPressed === false) {
              post.upvotes = post.upvotes - 1;
              update(setDownButton, true);
            } else {
              post.upvotes = post.upvotes + 1;
              update(setDownButton, false);
            }
            updateVotes(post);
          }}
        >
          <ThumbDownIcon sx={{ color: downButton ? primary : secondary }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

UpVoteButtons.propTypes = {
  post: PostShape.isRequired,
  allowVote: PropTypes.bool.isRequired,
};
