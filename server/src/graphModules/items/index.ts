import { gql } from "apollo-server-express";
import { Resolvers } from "src/types/generated/graphql";
import delay from "delay";

export const typeDefs = gql`
  extend type Query {
    """
    データベースから item 一覧を取得します
    """
    items: [Item!]!
  }

  """
  test 用の item　です
  """
  type Item {
    id: Int!
    name: String!
  }

  extend type Mutation {
    addItem(name: String!): Item!
    deleteItem(id: Int!): Item!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    items: async (_parent, _args, { token, db }) => {
      if (token !== "dev dummy") {
        return [{ id: 0, name: "error" }];
      }

      await delay(1000);

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
    deleteItem: async (_parent, { id }, { token, db }) => {
      if (token !== "dev dummy") {
        return { id: 0, name: "error" };
      }

      const newItems = db.items.filter((o) => o.id !== id);
      const [deletedItem] = db.items.filter((o) => o.id === id);

      db.items = newItems;
      return deletedItem;
    },
  },
};
