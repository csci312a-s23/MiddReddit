/*
  index.js
  Endpoints for getting and putting posts in mass
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";

import { onError, authenticated } from "../../../lib/middleware";
import Post from "../../../../models/Post";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError })
  .get(async (req, res) => {
    const query = Post.query();
    let posts;
    if (req.query.top) {
      posts = await query
        .withGraphFetched("userMadeBy")
        .withGraphJoined("category.[parent.^2]")
        .orderBy("upvotes", "desc");
    } else if (req.query.category) {
      posts = await query
        .withGraphFetched("userMadeBy")
        .withGraphJoined("category.[parent.^2]")
        .where("category.name", req.query.category) //only works for 1 level of nesting, have to refine how I deduplicate
        .orWhere("category:parent.name", req.query.category);
    } else {
      posts = await query
        .withGraphFetched("userMadeBy")
        .withGraphJoined("category.[parent.^2]");
    }
    res.status(200).json(posts);
  })
  .post(authenticated, async (req, res) => {
    // endpoint to create a new post
    const { ...newPost } = { ...req.body, author: req.user.id };
    console.log(newPost);
    const post = await Post.query().insertAndFetch(newPost).throwIfNotFound();
    res.status(200).json(post);
  });

export default handler;
