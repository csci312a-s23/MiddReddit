/*
    TopPosts.js

    This define a component to display the trending posts
*/
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
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
  }, []);

  let postDisp;
  if (topPosts) {
    const topPostShow = topPosts.slice(0, 3); // take top 3
    postDisp = topPostShow.map((post) => (
      <Card id={post.id} key={post.id} variant="outlined">
        <CardActionArea href={`/posts/${post.id}`}>
          <CardContent>
            <Typography variant="button" gutterBottom>
              {post.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  }

  return (
    <div>
      <h1>Trending Posts</h1>
      {postDisp}
    </div>
  );
}
