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
          `[category, comments.${r("[children?, author, post,parent]", 4)}]`
        )

        .modifyGraph("comments", (builder) => {
          builder.where("parentId", null);
        })
        .throwIfNotFound();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  })
  /*
    ...
  .query()
  .eager(`[children.${r('[children?, author,post,parent]', 3)}, pets]`)
...
*/

  //implement this, so I can have nested comments have names also

  // let query = Post.query();
  // if (req.query.section) {
  //   query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = req.query.section", [
  //     req.query.section,
  //   ]);
  // }
  // const posts = await query;
  // res.status(200).json(posts);

  // const { id, ...updatedPost } = req.body;
  // // req.query.id is a string, and so needs to be converted to an integer before comparison
  // if (id !== parseInt(updatedPost.id, 10)) {
  //   // Verify id in the url, e.g, /api/posts/10, matches the id the request body
  //   res.status(400).end(`URL and object does not match`);
  //   return;
  // }
  // // Update the database ...

  .put(async (req, res) => {
    // endpoint to update a new post
    const { id, ...updatePost } = req.body;
    //console.log(id);
    if (id !== parseInt(req.query.id, 10)) {
      res.status(400).end(`URL and object does not match`);
      return;
    }

    const post = await Post.query()
      .updateAndFetchById(id, updatePost)
      .throwIfNotFound();
    res.status(200).json(post);
  });

export default handler;
