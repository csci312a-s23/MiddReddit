/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Tag extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Tag";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],

      properties: {
        id: { type: "integer" },
        postId: { type: "integer" },
        categoryId: { type: "integer" },
      },
    };
  }
}
