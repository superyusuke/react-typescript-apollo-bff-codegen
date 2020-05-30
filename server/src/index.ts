import { startApolloServer } from 'src/apolloServer';

// Constants
const port = Number(process.env.PORT) || 8080;
startApolloServer({ port });
