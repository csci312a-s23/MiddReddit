/* eslint-disable camelcase */

import { Model } from "objection";
import BaseModel from "./BaseModel";
import User from "./User";
import Post from "./Post";
import CommentUpvote from "./CommentUpvote";

export default class Comment extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Comment";
  }

  // Objection.js assumes primary key is `id` by default
  static get jsonSchema() {
    return {
      type: "object",
      required: ["contents"],

      properties: {
        id: { type: "integer" },
        authorId: { type: "integer" },
        postId: { type: "integer" },
        parentId: { type: ["integer", "null"] },
        contents: { type: "string" },
        posted: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    return {
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: "Comment.parentId",
          to: "Comment.id",
        },
      },
      children: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "Comment.id",
          to: "Comment.parentId",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "Comment.postId",
          to: "Post.id",
        },
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "Comment.authorId",
          to: "User.id",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: CommentUpvote,
        join: {
          from: "Comment.id",
          to: "CommentUpvote.commentId",
        },
      },
    };
  }
}
