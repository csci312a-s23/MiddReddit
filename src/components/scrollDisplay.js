/*
  ScrollDisplay.js

  Displays the posts by a specific category. 

*/
import ScrollPost from "./scrollPosts";
import styles from "../styles/ScrollDisplay.module.css";
import PropTypes from "prop-types";
import PostShape from "./PostShape";

export default function ScrollDisplay({
  Posts,
  goToPost,
  setCurrentPost,
  currentPost,
  setLatestUpvote,
  searchBarQuery,
}) {
  let looking;
  let topempty = true;
  let bottomempty = true;
  if (searchBarQuery === "" || searchBarQuery === undefined) {
    looking = false;
  } else {
    looking = true;
  }

  const postComponentsTop = Posts.map((post) => {
    if (searchBarQuery === "" || searchBarQuery === undefined) {
      topempty = false;
      return (
        <ScrollPost
          post={post}
          key={post.id}
          goToPost={goToPost}
          setCurrentPost={setCurrentPost}
          currentPost={currentPost}
          setLatestUpvote={setLatestUpvote}
        />
      );
    } else {
      if (post.title.includes(searchBarQuery)) {
        topempty = false;
        return (
          <ScrollPost
            post={post}
            key={post.id}
            goToPost={goToPost}
            setCurrentPost={setCurrentPost}
            currentPost={currentPost}
            setLatestUpvote={setLatestUpvote}
          />
        );
      }
    }
  });

  const postComponentsBottom = Posts.map((post) => {
    if (searchBarQuery === "") {
      return;
    } else {
      if (post.userMadeBy.name.includes(searchBarQuery)) {
        bottomempty = false;
        return (
          <ScrollPost
            post={post}
            key={post.id}
            goToPost={goToPost}
            setCurrentPost={setCurrentPost}
            currentPost={currentPost}
            setLatestUpvote={setLatestUpvote}
          />
        );
      }
    }
  });


  //Style for when top or bottom component might be empty

  return (
    <div className={styles.body}>
      <div>
        {looking && <h2> Titles </h2>}
        {topempty && <p>No titles match your search query</p>}
        {postComponentsTop}
        {looking && <h2> Authors </h2>}
        {bottomempty && looking && <p>No authors match your search query</p>}
        {postComponentsBottom}
      </div>
    </div>
  );
}

ScrollDisplay.propTypes = {
  Posts: PropTypes.array.isRequired,
  goToPost: PropTypes.func,
  setCurrentPost: PropTypes.func,
  currentPost: PostShape,
};
