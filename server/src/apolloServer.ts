import { ApolloServer } from "apollo-server-express";
import { ApolloServer as ApolloServerNoExpress } from "apollo-server";
import { schema } from "src/schema";
import express from "express";

// local の jest test 時のみ使う
export const createTestApolloServer = () => {
  return new ApolloServerNoExpress({
    schema,
    context: () => {
      return {
        token: process.env.DEV_BEARER_TOKEN,
      };
    },
  });
};

let db = {
  items: [{ name: "Initial Item", id: -1 }],
  currentId: 0,
};

// express をかました apollo server
export const createApolloServer = () => {
  return new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        token: req.headers.authorization || "dev dummy",
        db,
      };
    },
  });
};

// apollo サーバーの実行
export const startApolloServer = ({ port }: { port: number | string }) => {
  const apolloServer = createApolloServer();

  const expressApp = express();

  const healthCheckPath = `/status`;

  expressApp.get(healthCheckPath, (req, res) => {
    console.log(`GET ${healthCheckPath}`);
    res.send("status OK");
  });

  const graphqlServerPath = `/graphql`;
  apolloServer.applyMiddleware({
    app: expressApp,
    cors: false,
    path: graphqlServerPath,
  });

  if (process.env.NODE_ENV !== "test") {
    expressApp.listen({ port, host: "0.0.0.0" }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${graphqlServerPath}, mode:${process.env.NODE_ENV}`
      );
    });
  }
};
