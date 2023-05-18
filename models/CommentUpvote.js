/* eslint-disable camelcase */

import BaseModel from "./BaseModel";

export default class CommentUpvote extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "CommentUpvote";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["commentId"],

      properties: {
        id: { type: "integer" },
        ownerId: { type: "integer" },
        commentId: { type: "integer" },
        upvote: { type: "boolean" },
        posted: { type: "string" },
      },
    };
  }
}
