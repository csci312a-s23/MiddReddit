/*
  ScrollPosts.js

  Displays the posts within our scroll display, when clicked, takes user to the
  corresponding page for the post (PostView component).
*/

//import PostView from "./PostView";
import styles from "../styles/ScrollPosts.module.css";
import PostShape from "./PostShape";
import PropTypes from "prop-types";

export default function ScrollPost({ post, goToPost }) {
  //let allowEdit = false;

  const currentPost = post;

  return (
    <li onClick={() => goToPost(currentPost)}>
      <div className={styles.post}>
        <h4>{post.title} </h4>
        <em>
          {post.owner} - {new Date().toLocaleString()}
        </em>
        <p>{post.contents} </p>
      </div>
    </li>
  );
}

ScrollPost.propTypes = {
  post: PostShape,
  goToPost: PropTypes.func.isRequired,
};
