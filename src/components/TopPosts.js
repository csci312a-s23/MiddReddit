/*
    TopPosts.js

    This define a component to display the trending posts
*/
import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";

export default function TopPosts({}) {
  const [topPosts, setTopPosts] = useState();

  /* onload fetch trending posts */
  useEffect(() => {
    fetch("/api/posts?top=10")
      .then((res) => res.json())
      .then((data) => {
        setTopPosts(data);
      });
  });

  let postDisp;
  if (topPosts) {
    postDisp = topPosts.map((post) => (
      <Card key={post.id} variant="outlined">
        <CardContent>{post.title}</CardContent>
      </Card>
    ));
  }
  /* map trending posts to MUI cards */

  return (
    <div>
      <h1>Trending Posts</h1>
      {postDisp}
    </div>
  );
}
