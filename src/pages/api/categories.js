/*
  categories.js
  return all or subsection of categories
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import { onError } from "../../lib/middleware";
import Category from "../../../models/Category";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError }).get(async (req, res) => {
  // Endpoint to fetch all posts, possible filtering by category
  const query = Category.query()
    .withGraphJoined("parent")
    .withGraphJoined("child")
    .where("parent.name", null); //only works for 1 level of nesting, have to refine how I deduplicate

  //NEED TO WORK ON FILTERING BY...
  // if (req.query.tag) {
  //   query = query.where("UPPER(SUBSTRING(title, 1, 1)) = ?", [
  //     req.query.tag,
  //   ]);
  // }
  const categories = await query;
  res.status(200).json(categories);
  //res.status(500).end("Endpoint not yet implemented");
});
export default handler;
