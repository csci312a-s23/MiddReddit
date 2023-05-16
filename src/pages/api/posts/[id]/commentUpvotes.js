/*
   comments.js
   Endpoints for adding a comment
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";

import { onError, authenticated } from "../../../../lib/middleware";
import CommentUpvote from "../../../../../models/CommentUpvote";

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
const handler = nc({ onError }).post(authenticated, async (req, res) => {
  // signed in user
  // endpoint to create a new post
  const { ...newCommentUpvote } = { ...req.body, ownerId: req.user.id };
  const booleanUpvoteObject = await CommentUpvote.query() //seeing if upvote is there already
    .where("ownerId", req.user.id)
    .where("commentId", req.body.commentId)
    .select("upvote");

  const booleanUpvote = booleanUpvoteObject[0]
    ? booleanUpvoteObject[0].upvote
    : undefined;
  if (booleanUpvote === Number(req.body.upvote)) {
    //reclicking the button, undo previous
    await CommentUpvote.query()
      .delete()
      .where("commentId", newCommentUpvote.commentId)
      .where("ownerId", newCommentUpvote.ownerId);
    res.status(200).json("deleted"); //returning deleted so it is different from the object being deleted -> want to trigger rerender
  } else if (booleanUpvote === undefined) {
    //nothing there yet: going to add upvote or downvote
    const newCommentUpvoteQuery = await CommentUpvote.query().insertAndFetch(
      newCommentUpvote
    );
    res.status(200).json(newCommentUpvoteQuery);
  } else {
    //change upvote to downvote or vice versa
    await CommentUpvote.query()
      .patch({ upvote: newCommentUpvote.upvote })
      .where("commentId", newCommentUpvote.commentId)
      .where("ownerId", newCommentUpvote.ownerId)
      .throwIfNotFound();
    res.status(200).json(`reverseTo${newCommentUpvote.upvote}`);
  }
});

export default handler;
