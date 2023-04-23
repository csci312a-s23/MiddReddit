/* eslint-disable camelcase */

import { Model } from "objection";
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
        name: { type: "string" },
        description: { type: "text" },
        posts: { type: "INT[]" },
      },
    };
  }
  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: "Category.parentId",
        to: "Category.id",
      },
    },
    child: {
      relation: Model.HasManyRelation,
      modelClass: Category,
      join: {
        from: "Category.id",
        to: "Category.parentId",
      },
    },
  };
}
