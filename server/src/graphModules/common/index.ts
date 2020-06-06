import { gql } from "apollo-server-express";
import { Resolvers } from "src/types/generated/graphql";
import delay from "delay";
// import { PrismaClient } from "src/generated/prismaClient";
//
// const prisma = new PrismaClient();

import { Client } from "pg";
import { callbackify } from "util";

export const typeDefs = gql`
  scalar Upload

  type Query {
    _dummy: Boolean
    healthCheckMessage: String!
    pg: String!
    #    prismaDB: String
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
    pg: async () => {
      const client = new Client({
        user: "postgres",
        host: "/cloudsql/elegant-hope-273402:asia-northeast1:my-pgdb",
        database: "postgres",
        password: "test",
        // port: 3211,
      });

      await client.connect();

      const res = await client.query("SELECT * from account");
      const item = res.rows[0].username;
      return item;
    },
    // prismaDB: async () => {
    //   console.log("prisma db start");
    //   try {
    //     const allUsers = await prisma.account.findMany();
    //     console.log(allUsers, "allUsers");
    //     return allUsers[0].username;
    //   } catch (e) {
    //     console.log(e.message);
    //     throw new Error(e);
    //   }
    // },
  },
};
