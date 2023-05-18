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
