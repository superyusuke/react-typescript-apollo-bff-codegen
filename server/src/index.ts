import { startApolloServer } from "src/apolloServer";

const port = Number(process.env.PORT) || 8080;
startApolloServer({ port });
