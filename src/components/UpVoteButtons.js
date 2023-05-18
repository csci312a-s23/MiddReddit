/*
  upVoteButton.js

  The `upVoteButton` component is a collection of upvote and downvote buttons.

  The bar has two states determined by `allowEdit`. If false, Buttons disabled.

  props:
    post - Post that gives up upvotes
    setLatestUpvote -> triggers rerender when upvote
*/

import PostShape from "./PostShape";
import PropTypes from "prop-types";
//MUI Imports
import { Box, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UpVoteButtons({ post, setLatestUpvote }) {
  const [currentUpvoteAmount, setCurrentUpvoteAmount] = useState();

  const submitUpvote = async (upvoteOrDownVote) => {
    const newPostUpvote = {
      postId: post.id,
      upvote: upvoteOrDownVote,
    };
    const params = {
      method: "POST",
      body: JSON.stringify(newPostUpvote),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch(`/api/posts/${post.id}/postUpvotes`, params);
    const submittedPostUpvote = await response.json();
    setLatestUpvote(submittedPostUpvote);
  };

  const updateVotes = async (count) => {
    fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        upvotes: count,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    const upvotes = post.votes.reduce(
      (accumulator, vote) => (vote.upvote ? accumulator + 1 : accumulator - 1),
      0
    );
    setCurrentUpvoteAmount(upvotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const { data: session } = useSession();
  const userId = session ? session.user.id : 0;

  let upvoteColor,
    downvoteColor = "black";

  const userVote = post.votes.filter(
    (vote) => parseInt(vote.ownerId) === userId
  );
  const userUpvoteOrDownvote = userVote[0] ? userVote[0].upvote : undefined; //extra step so not indexing empty array

  if (userUpvoteOrDownvote !== undefined) {
    //weird ternary condition here
    userUpvoteOrDownvote ? (upvoteColor = "blue") : (downvoteColor = "orange");
  }

  return (
    <Box position="static">
      <Stack alignItems="center">
        <IconButton
          onClick={() => {
            if (userUpvoteOrDownvote !== undefined) {
              userUpvoteOrDownvote
                ? updateVotes(currentUpvoteAmount - 1)
                : updateVotes(currentUpvoteAmount + 2);
            } else {
              updateVotes(currentUpvoteAmount + 1);
            }
            submitUpvote(true);
          }}
        >
          <ThumbUpIcon sx={{ color: upvoteColor, position: "static" }} />
        </IconButton>

        <Typography color="blue"> {currentUpvoteAmount} </Typography>

        <IconButton
          onClick={() => {
            if (userUpvoteOrDownvote !== undefined) {
              userUpvoteOrDownvote
                ? updateVotes(currentUpvoteAmount - 2)
                : updateVotes(currentUpvoteAmount + 1);
            } else {
              updateVotes(currentUpvoteAmount - 1);
            }
            submitUpvote(false);
          }}
        >
          <ThumbDownIcon sx={{ color: downvoteColor }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

UpVoteButtons.propTypes = {
  post: PostShape.isRequired,
  setLatestUpvote: PropTypes.func.isRequired,
};
