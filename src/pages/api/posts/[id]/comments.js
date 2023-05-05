/*
  comments.js
  Endpoints for adding a comment
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";

import { onError, authenticated } from "../../../../lib/middleware";
import Comment from "../../../../../models/Comment";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError })
  /*.get(async (req, res) => {
     if (req.query) {
      const { category } = req.query;
      let query;
      if (category) {
        query = Post.query()
          .withGraphJoined("category.[parent.^2]")
          .where("category.name", category) //only works for 1 level of nesting, have to refine how I deduplicate
          .orWhere("category:parent.name", category);
      } else {
        query = Post.query().withGraphJoined("category.[parent.^2]");
      }
      const posts = await query;
      res.status(200).json(posts);  don't use this one yet
    } else { */
  // Endpoint to fetch all posts, possible filtering by category
  /*const query = Post.query();
    //NEED TO WORK ON FILTERING BY...
    // if (req.query.tag) {
    //   query = query.where("UPPER(SUBSTRING(title, 1, 1)) = ?", [
    //     req.query.tag,
    //   ]);
    // }
    const posts = await query;
    res.status(200).json(posts); 
    }
  }) */
  .post(authenticated, async (req, res) => {
    // signed in user
    // endpoint to create a new post
    const { ...newComment } = { ...req.body, authorId: req.user.id };
    const comment = await Comment.query()
      .insertAndFetch(newComment)
      .throwIfNotFound();
    res.status(200).json(comment);
  });

export default handler;
