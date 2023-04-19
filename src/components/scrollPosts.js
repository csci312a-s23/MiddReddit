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
/* eslint-disable quotes */

const NoBulletList = styled("ul")(() => ({
  listStyle: "none",
  paddingLeft: 0,
}));

export default function ScrollPost({ post, goToPost, setCurrentPost }) {
  return (
    <NoBulletList
      onClick={() => {
        setCurrentPost(post.id);
        goToPost(post);
      }}
    >
      <div className={styles.post}>
        <center>
          <h4>{post.title} </h4>
          <em
            suppressHydrationWarning /*have to suppress hydration with dates*/
          >
            {/*eslint-disable-line */}
            {post.owner} - {new Date(post.posted).toLocaleString()}
          </em>

          <p>{post.contents} </p>
        </center>
      </div>
    </NoBulletList>
  );
}

ScrollPost.propTypes = {
  post: PostShape,
  goToPost: PropTypes.func.isRequired,
};
