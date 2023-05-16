/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Post from "./Post";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["googleId"],

      properties: {
        id: { type: "integer" },
        googleId: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "User.id",
          to: "Post.author",
        },
      },
    };
  }

  // Override this method to exclude googleId
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.googleId;
    return json;
  }
}
