/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Post extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Post";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        author: { type: "string" },
        contents: { type: "text" },
        comments: { type: "INT[]" },
        posted: { type: "string" },
        upvotes: { type: "integer" },
      },
    };
  }
  static get relationMappings() {
    const Category = require("./Category");
    const Tag = require("./Tag");
    return {
      Category: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: "Post.id",
          through: {
            // Tag is the join table.
            modelClass: Tag,
            from: "Tag.postID",
            to: "Tag.categoryID",
          },
          to: "Category.id",
        },
      },
    };
  }
}
