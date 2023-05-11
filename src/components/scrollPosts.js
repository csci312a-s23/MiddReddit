/*
  ScrollPosts.js

  Displays the posts within our scroll display, when clicked, takes user to the
  corresponding page for the post (PostView component).
*/

//import PostView from "./PostView";
import styles from "../styles/ScrollPosts.module.css";
import PostShape from "./PostShape";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
//import { Button } from "@mui/material";
import UpVoteButtons from "./UpVoteButtons";
//import { Typography } from "@mui/material";
//import { Box } from "@mui/material";
/* eslint-disable quotes */

const NoBulletList = styled("ul")(() => ({
  listStyle: "none",
  paddingLeft: 0,
}));

export default function ScrollPost({ post, goToPost, setCurrentPost }) {
  const allowVote = false;

  return (
    <NoBulletList>
      <div className={styles.post}>
        <div className={styles.votes}>
          <UpVoteButtons
            post={post}
            upVotes={post.upvotes}
            allowVote={allowVote}
          />
        </div>

        {/*
        <div className={styles.float}>
          {{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
        </div>
        */}

        <div
          className={styles.body}
          onClick={() => {
            setCurrentPost(post.id);
            goToPost(post);
          }}
        >
          <center>
            <h4>{post.title} </h4>
            <em
              suppressHydrationWarning /*have to suppress hydration with dates*/
            >
              {/*eslint-disable-line */}
              {post.userMadeBy.name} - {new Date(post.posted).toLocaleString()}
            </em>

            <p>{post.contents} </p>
          </center>
        </div>
      </div>
    </NoBulletList>
  );
}

ScrollPost.propTypes = {
  post: PostShape,
  goToPost: PropTypes.func,
};
