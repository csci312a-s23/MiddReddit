/*
  categories.js
  return all or subsection of categories
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import { onError } from "../../lib/middleware";
import Event from "../../../models/Event";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError }).get(async (req, res) => {
  // Endpoint to fetch all posts, possible filtering by category
  const query = Event.query()
    .withGraphJoined("[parent, children.^3]")
    .where("parent.name", null); //only works for 1 level of nesting, have to refine how I deduplicate
  const categories = await query;
  res.status(200).json(categories);
});
export default handler;
