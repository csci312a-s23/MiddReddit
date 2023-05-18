/*
   postUpvote.js
   Endpoints for adding a post upvote
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";

import { onError, authenticated } from "../../../../lib/middleware";
import PostUpvote from "../../../../../models/PostUpvote";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError }).post(authenticated, async (req, res) => {
  // signed in user
  // endpoint to create a new post
  const { ...newPostUpvote } = { ...req.body, ownerId: req.user.id };
  const booleanUpvoteObject = await PostUpvote.query() //seeing if upvote is there already
    .where("ownerId", req.user.id)
    .where("postId", req.body.postId)
    .select("upvote");

  const booleanUpvote = booleanUpvoteObject[0]
    ? booleanUpvoteObject[0].upvote
    : undefined;
  if (booleanUpvote === Number(req.body.upvote)) {
    //reclicking the button, undo previous
    await PostUpvote.query()
      .delete()
      .where("postId", newPostUpvote.postId)
      .where("ownerId", newPostUpvote.ownerId);
    res.status(200).json("deleted"); //returning deleted so it is different from the object being deleted -> want to trigger rerender
  } else if (booleanUpvote === undefined) {
    //nothing there yet: going to add upvote or downvote
    const newPostUpvoteQuery = await PostUpvote.query().insertAndFetch(
      newPostUpvote
    );
    res.status(200).json(newPostUpvoteQuery);
  } else {
    //change upvote to downvote or vice versa
    await PostUpvote.query()
      .patch({ upvote: newPostUpvote.upvote })
      .where("postId", newPostUpvote.postId)
      .where("ownerId", newPostUpvote.ownerId)
      .throwIfNotFound();
    res.status(200).json(`reverseTo${newPostUpvote.upvote}`);
  }
});

export default handler;
