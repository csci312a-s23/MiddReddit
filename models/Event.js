/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";
import { Model } from "objection";
import User from "./User"
export default class Event extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Event";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        details: { type: "string" },
        date: { type: "string"},
        posted: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    return {
      userMadeBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "Event.madeBy",
          to: "User.id"
        }
      }
    };
  }
}
