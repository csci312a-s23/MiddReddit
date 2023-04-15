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

// const handler = nc({ onError }).get(async (req, res) => {
//   const sections = await knex("Post")
//     .select(knex.raw("UPPER(SUBSTRING(title, 1, 1)) AS section"))
//     .distinct()
//     .orderBy("section");
//   res.status(200).json(sections.map((section) => section.section));
//   //res.status(500).end("Endpoint not yet implemented");
// });

const handler = nc({ onError })
  .get(async (req, res) => {
    // Endpoint to fetch all posts, possible filtering by category
    let query = Post.query();
    //NEED TO WORK ON FILTERING BY
    if (req.query.section) {
      query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = ?", [
        req.query.section,
      ]);
    }
    const posts = await query;
    res.status(200).json(posts);
    //res.status(500).end("Endpoint not yet implemented");
  })
  .post(async (req, res) => {
    // TODO: Implement endpoint to create a new post
    const posts = await Post.query().insertAndFetch(req.body);
    res.status(200).json(posts);
    //res.status(500).end("Endpoint not yet implemented");
  });
export default handler;
