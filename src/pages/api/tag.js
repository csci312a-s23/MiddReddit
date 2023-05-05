/*
  tag.js
  Endpoints for updating post category relations
*/

import nc from "next-connect";
import Tag from "../../../models/Tag";
import { onError } from "../../lib/middleware";

const handler = nc({ onError }).post(async (req, res) => {
  const { ...newTag } = { ...req.body };
  const tag = await Tag.query().insertAndFetch(newTag).throwIfNotFound();
  res.status(200).json(tag);
});

export default handler;
