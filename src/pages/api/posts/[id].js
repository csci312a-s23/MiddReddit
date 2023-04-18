import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import Post from "../../../../models/Post";
// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError }).get(async (req, res) => {
  try {
    const post = await Post.query()
      //.withGraphFetched("category") //this is the related thing that breaks it,
      .withGraphFetched("category")
      .findById(req.query.id)
      .throwIfNotFound();
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }

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
});

export default handler;
