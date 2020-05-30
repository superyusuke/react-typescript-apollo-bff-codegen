import { gql } from "apollo-server-express";
import { Resolvers } from "src/types/generated/graphql";
import delay from "delay";

export const typeDefs = gql`
  extend type Query {
    items: [Item!]!
  }

  type Item {
    id: Int!
    name: String!
  }

  extend type Mutation {
    addItem(name: String!): Item!
  }
`;
export const resolvers: Resolvers = {
  Query: {
    items: async (_parent, _args, { token, db }) => {
      if (token !== "dev dummy") {
        return [{ id: 0, name: "error" }];
      }

      return db.items;
    },
  },
  Mutation: {
    addItem: async (_parent, { name }, { token, db }) => {
      if (token !== "dev dummy") {
        return { id: 0, name: "error" };
      }

      const newItem = { id: db.currentId++, name: name };

      db.items = [...db.items, newItem];
      return newItem;
    },
  },
};
