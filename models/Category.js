/* eslint-disable camelcase */

import { Model } from "objection";
import BaseModel from "./BaseModel";
//import Post from "./Post";

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
        posts2: { type: "INT[]" },
      },
    };
  }
  static get relationMappings() {
    const Post = require("./Post");

    return {
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "Category.parentId",
          to: "Category.id",
        },
      },
      children: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: "Category.id",
          to: "Category.parentId",
        },
      },
      posts: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: "Category.id",
          through: {
            // Tag is the join table.
            from: "Tag.categoryId",
            to: "Tag.postId",
          },
          to: "Post.id",
        },
      },
    };
  }
}
