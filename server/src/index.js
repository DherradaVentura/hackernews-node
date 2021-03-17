import pkg from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { PubSub } from 'apollo-server';
import typeDefs from './schema.js';
import * as Query from './resolvers/Query.js';
import * as Mutation from './resolvers/Mutation.js';
import * as Link from './resolvers/Link.js';
import User from './resolvers/User.js';
import * as Vote from './resolvers/Vote.js';
import * as Subscription from './resolvers/Subscription.js';
import { getUserId } from './utils.js';
import dotenv from 'dotenv';
const { PrismaClient } = pkg;
dotenv.config();

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Query,
  Link,
  Mutation,
  User,
  Vote,
  Subscription,
};

// Server
/*
Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
This tells the server what API operations are accepted and how they should be resolved.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
