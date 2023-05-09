/* eslint-disable camelcase */
import BaseModel from "./BaseModel";
import { Model } from "objection";
import Category from "./Category";
import User from "./User";
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
        author: { type: "integer" },
        contents: { type: "string" },
        //comments: { type: "INT[]" },
        posted: { type: "string" },
        upvotes: { type: "integer" },
      },
    };
  }
  static get relationMappings() {
    return {
      category: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: "Post.id",
          through: {
            // Tag is the join table.
            from: "Tag.postId",
            to: "Tag.categoryId",
          },
          to: "Category.id",
        },
      },
      userMadeBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "Post.author",
          to: "User.id",
        },
      },
    };
  }
}
