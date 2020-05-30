import { merge } from 'lodash';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import * as commonModule from 'src/graphModules/common';
import * as itemsModule from 'src/graphModules/items'

export const schema = makeExecutableSchema({
  resolvers: merge(
    {},
    commonModule.resolvers,
      itemsModule.resolvers
  ) as IResolvers,
  typeDefs: [
    commonModule.typeDefs,
    itemsModule.typeDefs
  ],
});
