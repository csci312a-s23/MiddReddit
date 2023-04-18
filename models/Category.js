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
      relation: Model.ManyToManyRelation,
      modelClass: Category,
      join: {
        from: "Category.id",
        through: {
          // RelatedArticle is the join table. These names must match the schema
          from: "RelatedCategories.childId",
          to: "RelatedCategories.parentId",
        },
        to: "Category.id",
      },
    },
    child: {
      relation: Model.ManyToManyRelation,
      modelClass: Category,
      join: {
        from: "Category.id",
        through: {
          // RelatedArticle is the join table. These names must match the schema
          from: "RelatedCategories.parentId",
          to: "RelatedCategories.childId",
        },
        to: "Category.id",
      },
    },
  };
}
