/*
    TopPosts.js

    This define a component to display the trending posts
*/
import { useEffect, useState } from "react";
import TopPostCard from "./TopPostCard";
import PropTypes from "prop-types";

export default function TopPostDisplay({ goToPost, latestUpvote }) {
  const [topPosts, setTopPosts] = useState();

  /* onload fetch trending posts */
  useEffect(() => {
    fetch("/api/posts?top=10")
      .then((res) => res.json())
      .then((data) => {
        setTopPosts(data);
      });
  }, []);

  console.log(latestUpvote);

  let postDisp;
  if (topPosts) {
    const topPostShow = topPosts.slice(0, 3); // take top 3
    postDisp = topPostShow.map((post) => (
      <TopPostCard key={post.id} post={post} goToPost={goToPost} />
    ));
  }
  /* map trending posts to MUI cards */

  return (
    <div>
      <h2>Trending Posts</h2>
      {postDisp}
    </div>
  );
}

TopPostDisplay.propTypes = {
  goToPost: PropTypes.func.isRequired,
};
