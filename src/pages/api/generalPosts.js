/*
  generalPosts.js
  Methods for getting and putting posts in mass
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import { onError } from "../../lib/middleware";
import Post from "../../../models/Post";

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
    //res.status(500).end("Endpoint not yet implemented");
  })
  .post(async (req, res) => {
    // endpoint to create a new post
    const posts = await Post.query().insertAndFetch(req.body);
    res.status(200).json(posts);
    //res.status(500).end("Endpoint not yet implemented");
  });
export default handler;
