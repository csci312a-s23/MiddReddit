/* eslint-disable camelcase */
import BaseModel from "./BaseModel";

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

  // Override this method to exclude googleId
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.googleId;
    return json;
  }
}