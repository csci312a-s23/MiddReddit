/* eslint-disable camelcase */

// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Category extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Category";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        parentID: { type: "integer" },
        children: { type: "INT[]" },
        name: { type: "string" },
        description: { type: "text" },
        posts: { type: "INT[]" },
      },
    };
  }
}
