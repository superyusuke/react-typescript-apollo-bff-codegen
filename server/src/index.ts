import { startApolloServer } from 'src/apolloServer';

console.log(process.version, 'node version' )

// Constants
const port = Number(process.env.PORT) || 8080;
startApolloServer({ port });
