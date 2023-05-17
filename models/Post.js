/* eslint-disable camelcase */
import BaseModel from "./BaseModel";
import { Model } from "objection";
import Category from "./Category";
import User from "./User";
import Comment from "./Comment";
import PostUpvote from "./PostUpvote";
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
            from: "Tag.post",
            to: "Tag.category",
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
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "Post.id",
          to: "Comment.postId",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: PostUpvote,
        join: {
          from: "Post.id",
          to: "PostUpvote.postId",
        },
      },
    };
  }
}
