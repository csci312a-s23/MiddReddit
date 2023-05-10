/* eslint-disable camelcase */

//import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class CommentUpvote extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "CommentUpvote";
  }

  // Objection.js assumes primary key is `id` by default
  /* table.increments("id").primary();
  table.integer("author");
  table.foreign("author").references("User.id").onDelete("SET NULL");
  table.text("contents");
  table.integer("parentID");
  table.string("posted").notNullable(); */
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
