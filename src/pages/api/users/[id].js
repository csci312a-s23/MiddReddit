/*
  [i].js
  Endpoints for getting and putting specific posts and updating likes/dislikes
*/

import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/User";

const handler = nc({ onError }).get(async (req, res) => {
  const user = await User.query()
    .withGraphFetched("posts")
    .findById(req.query.id)
    .throwIfNotFound();
  res.status(200).json(user);
});

export default handler;
