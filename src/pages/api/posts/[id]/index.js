/*
  index.js
  Endpoints for getting and putting specific posts and updating likes/dislikes
*/

import nc from "next-connect";
import { onError } from "../../../../lib/middleware";
import Post from "../../../../../models/Post";
// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.

function r(expr, depth) {
  return expr.replace("?", depth > 0 ? `.${r(expr, depth - 1)}` : "");
}
const handler = nc({ onError })
  .get(async (req, res) => {
    try {
      const post = await Post.query()
        .findById(req.query.id)
        .withGraphJoined(
          `[category, comments.${r(
            //recurisve algorithm here to fetch nested comments
            "[children?, author, post,parent,votes]",
            4
          )}]`
        )

        .modifyGraph("comments", (builder) => {
          //only fetching parent comments, similar to categories
          builder.where("parentId", null);
        })
        .throwIfNotFound();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    // endpoint to update a new post
    const { id, ...updatePost } = req.body;
    if (id !== parseInt(req.query.id, 10)) {
      res.status(400).end(`URL and object does not match`);
      return;
    }

    const post = await Post.query()
      .updateAndFetchById(id, updatePost)
      .throwIfNotFound();
    res.status(200).json(post);
  })
  .patch(async (req, res) => {
    const post = await Post.query()
      .patchAndFetchById(req.query.id, req.body)
      .throwIfNotFound();
    res.status(200).json(post);
  });

export default handler;
