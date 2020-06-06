import { gql } from "apollo-server-express";
import { Resolvers } from "src/types/generated/graphql";
import delay from "delay";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = gql`
  scalar Upload

  type Query {
    _dummy: Boolean
    healthCheckMessage: String!
    prismaDB: String
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
    prismaDB: async () => {
      console.log("prisma db start");
      try {
        const allUsers = await prisma.account.findMany();
        console.log(allUsers, "allUsers");
        return allUsers[0].username;
      } catch (e) {
        console.log(e.message);
        throw new Error("");
      }
    },
  },
};
