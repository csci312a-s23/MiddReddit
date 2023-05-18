/* eslint-disable camelcase */

import BaseModel from "./BaseModel";

export default class PostUpvote extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "PostUpvote";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["postId"],

      properties: {
        id: { type: "integer" },
        ownerId: { type: "integer" },
        postId: { type: "integer" },
        upvote: { type: "boolean" },
      },
    };
  }
}
