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
    // Endpoint to fetch all posts, possible filtering by category
    const query = Post.query();
    //NEED TO WORK ON FILTERING BY...
    // if (req.query.tag) {
    //   query = query.where("UPPER(SUBSTRING(title, 1, 1)) = ?", [
    //     req.query.tag,
    //   ]);
    // }
    const posts = await query;
    res.status(200).json(posts);
  })
  .post(authenticated, async (req, res) => {
    // endpoint to create a new post
    const { ...newPost } = { ...req.body, author: req.user.name };
    //newPost.author = req.user.id;
    const post = await Post.query().insertAndFetch(newPost).throwIfNotFound();
    res.status(200).json(post);
  });
export default handler;
