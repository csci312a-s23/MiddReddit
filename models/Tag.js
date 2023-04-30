/* eslint-disable camelcase */
import BaseModel from "./BaseModel";

export default class Tag extends BaseModel {
  static get tableName() {
    return "Tag";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        id: { type: "integer" },
        postId: { type: "integer" },
        categoryId: { type: "integer" },
      },
    };
  }
}
