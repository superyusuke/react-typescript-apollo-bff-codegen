import { gql } from "apollo-server-express";
import { Resolvers } from "src/types/generated/graphql";
import delay from "delay";

export const typeDefs = gql`
  scalar Upload

  type Query {
    _dummy: Boolean
    healthCheckMessage: String!
  }
  type Mutation {
    _dummy: Boolean
  }
  type Subscription {
    _dummy: Boolean
  }
`;
export const resolvers: Resolvers = {
  Query: {
    healthCheckMessage: async () => {
      await delay(1000);
      return "this is health check message. OK";
    },
  },
};
